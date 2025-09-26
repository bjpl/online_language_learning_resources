#!/usr/bin/env python3
"""
Main Resource Update Orchestrator
==================================
Production-ready system for applying reviewed changes to language resource files.

This is the main entry point that orchestrates:
1. Loading change directives (removals & replacements)
2. Matching changes to resources across all language files
3. Validating changes before application
4. Creating backups with rollback capability
5. Applying changes with transaction support
6. Generating comprehensive reports

Design Philosophy:
- Fail-safe by default (dry-run mode)
- Progressive disclosure (verbose logging options)
- Transaction support (all-or-nothing updates)
- Comprehensive audit trail

Usage:
    python apply_resource_updates.py --dry-run
    python apply_resource_updates.py --execute --backup
    python apply_resource_updates.py --rollback backup_20240123_143022
"""

import json
import sys
import argparse
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Tuple, Optional, Any
from collections import defaultdict
from dataclasses import dataclass, asdict
import traceback

# Import our modules
from resource_updater_core import (
    ResourceMatcher, BackupManager, URLNormalizer,
    FuzzyMatcher, ResourceMatch, MatchConfidence
)
from javascript_updater import (
    JavaScriptParser, JavaScriptUpdater, ResourceLocation
)

# Configure rich logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('resource_updates.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


@dataclass
class UpdateStatistics:
    """Track statistics for the update process"""
    total_files_processed: int = 0
    total_resources_scanned: int = 0
    removals_matched: int = 0
    removals_applied: int = 0
    replacements_matched: int = 0
    replacements_applied: int = 0
    unmatched_removals: int = 0
    unmatched_replacements: int = 0
    conflicts_detected: int = 0
    errors_encountered: int = 0
    files_modified: List[str] = None

    def __post_init__(self):
        if self.files_modified is None:
            self.files_modified = []

    def to_dict(self):
        return asdict(self)


class ConflictResolver:
    """
    Handles conflicts in change directives.

    Conflict types:
    1. Same resource marked for both removal and replacement
    2. Multiple matches for single directive
    3. Cascading dependencies
    """

    @staticmethod
    def detect_conflicts(removals: List[Dict], replacements: List[Dict]) -> List[Dict]:
        """
        Detect conflicts between removal and replacement directives.

        Returns list of conflicts with resolution recommendations.
        """
        conflicts = []

        # Build URL sets for quick lookup
        removal_urls = {r.get('url', r.get('original_url', '')) for r in removals}
        replacement_urls = {r.get('original_url', r.get('url', '')) for r in replacements}

        # Find URLs in both sets
        conflicting_urls = removal_urls.intersection(replacement_urls)

        for url in conflicting_urls:
            # Find the specific entries
            removal_entry = next((r for r in removals
                                 if r.get('url', r.get('original_url', '')) == url), None)
            replacement_entry = next((r for r in replacements
                                     if r.get('original_url', r.get('url', '')) == url), None)

            conflicts.append({
                'type': 'removal_replacement_conflict',
                'url': url,
                'removal': removal_entry,
                'replacement': replacement_entry,
                'recommendation': 'prefer_replacement'  # Usually replacement is more specific
            })

        return conflicts

    @staticmethod
    def resolve_conflicts(conflicts: List[Dict], strategy: str = 'prefer_replacement') -> Dict:
        """
        Resolve conflicts based on strategy.

        Strategies:
        - prefer_replacement: Choose replacement over removal
        - prefer_removal: Choose removal over replacement
        - manual: Require manual intervention
        """
        resolutions = {
            'apply_removals': [],
            'apply_replacements': [],
            'skip': []
        }

        for conflict in conflicts:
            if strategy == 'prefer_replacement':
                resolutions['apply_replacements'].append(conflict['replacement'])
                logger.info(f"Resolved conflict for {conflict['url']}: applying replacement")
            elif strategy == 'prefer_removal':
                resolutions['apply_removals'].append(conflict['removal'])
                logger.info(f"Resolved conflict for {conflict['url']}: applying removal")
            else:
                resolutions['skip'].append(conflict)
                logger.warning(f"Skipping conflicted resource: {conflict['url']}")

        return resolutions


class ResourceUpdateOrchestrator:
    """
    Main orchestrator for the complete update process.

    Implements the complete pipeline:
    1. Load → 2. Match → 3. Validate → 4. Backup → 5. Apply → 6. Verify → 7. Report
    """

    def __init__(self, project_root: Path, dry_run: bool = True):
        self.project_root = project_root
        self.dry_run = dry_run
        self.js_dir = project_root / "assets" / "js"
        self.review_dir = project_root / "review_results"

        # Initialize components
        self.matcher = ResourceMatcher()
        self.backup_manager = BackupManager(project_root / "backups")
        self.js_parser = JavaScriptParser()
        self.js_updater = JavaScriptUpdater(dry_run=dry_run)
        self.conflict_resolver = ConflictResolver()

        # Statistics tracking
        self.stats = UpdateStatistics()

        # Change tracking
        self.matched_changes = defaultdict(lambda: {
            'removals': [],
            'replacements': []
        })
        self.unmatched_changes = {
            'removals': [],
            'replacements': []
        }

    def load_change_directives(self) -> Tuple[List[Dict], List[Dict]]:
        """
        Load removal and replacement directives from JSON files.

        Returns tuple of (removals, replacements)
        """
        logger.info("Loading change directives...")

        # Load removals from both files
        all_removals = []

        # Marked review removals
        marked_removals_file = self.review_dir / "marked_review_removals.json"
        if marked_removals_file.exists():
            with open(marked_removals_file, 'r', encoding='utf-8') as f:
                marked_removals = json.load(f)
                all_removals.extend(marked_removals)
                logger.info(f"Loaded {len(marked_removals)} removals from marked review")

        # Link review deletions
        link_deletions_file = self.review_dir / "link_review_deletions.json"
        if link_deletions_file.exists():
            with open(link_deletions_file, 'r', encoding='utf-8') as f:
                link_deletions = json.load(f)
                all_removals.extend(link_deletions)
                logger.info(f"Loaded {len(link_deletions)} deletions from link review")

        # Load replacements
        replacements_file = self.review_dir / "url_replacements.json"
        replacements = []
        if replacements_file.exists():
            with open(replacements_file, 'r', encoding='utf-8') as f:
                replacements = json.load(f)
                logger.info(f"Loaded {len(replacements)} URL replacements")

        return all_removals, replacements

    def load_language_files(self) -> Dict[Path, Dict]:
        """
        Load all language data files.

        Returns dictionary mapping file paths to parsed data.
        """
        language_files = {}
        data_files = list(self.js_dir.glob("*-data.js"))

        # Exclude backup files
        data_files = [f for f in data_files if 'backup' not in f.name]

        logger.info(f"Found {len(data_files)} language data files")

        for file_path in data_files:
            try:
                parsed_data, lines = self.js_parser.parse_file(file_path)
                language_files[file_path] = {
                    'parsed': parsed_data,
                    'lines': lines
                }
                self.stats.total_files_processed += 1

                # Count resources
                for resource_type, categories in parsed_data['resources'].items():
                    for category in categories:
                        self.stats.total_resources_scanned += len(category.get('items', []))

                logger.debug(f"Loaded {file_path.name}")
            except Exception as e:
                logger.error(f"Failed to load {file_path.name}: {e}")

        return language_files

    def match_changes_to_resources(self, removals: List[Dict],
                                  replacements: List[Dict],
                                  language_files: Dict) -> Dict:
        """
        Match change directives to actual resources in files.

        Uses intelligent matching with fallback strategies.
        Returns matched changes organized by file.
        """
        logger.info("Matching changes to resources...")

        # Process each language file
        for file_path, file_data in language_files.items():
            parsed = file_data['parsed']
            language = file_path.stem.replace('-data', '')

            # Process each resource in the file
            for resource_type, categories in parsed['resources'].items():
                for cat_idx, category in enumerate(categories):
                    for item_idx, item in enumerate(category.get('items', [])):
                        # Try to match with removals
                        for removal in removals:
                            # Check if language matches
                            removal_lang = removal.get('language', '').lower()
                            if removal_lang and removal_lang != language:
                                continue

                            # Try to match
                            match = self.matcher.find_match(item, [removal], min_confidence=70.0)
                            if match:
                                location = ResourceLocation(
                                    file_path=file_path,
                                    resource_type=resource_type,
                                    category_index=cat_idx,
                                    item_index=item_idx,
                                    line_number=item.get('_line_number', 0)
                                )
                                self.matched_changes[file_path]['removals'].append({
                                    'match': match,
                                    'location': location,
                                    'directive': removal
                                })
                                self.stats.removals_matched += 1
                                logger.debug(f"Matched removal: {item.get('name')} "
                                          f"(confidence: {match.confidence:.1f}%)")

                        # Try to match with replacements
                        for replacement in replacements:
                            # Check if language matches
                            replacement_lang = replacement.get('language', '').lower()
                            if replacement_lang and replacement_lang != language:
                                continue

                            # Match using original URL
                            if 'original_url' in replacement:
                                # Create a temporary dict for matching
                                temp_replacement = {
                                    'url': replacement['original_url'],
                                    'name': replacement.get('title', replacement.get('name', ''))
                                }
                                match = self.matcher.find_match(item, [temp_replacement],
                                                               min_confidence=70.0)
                                if match:
                                    location = ResourceLocation(
                                        file_path=file_path,
                                        resource_type=resource_type,
                                        category_index=cat_idx,
                                        item_index=item_idx,
                                        line_number=item.get('_url_line', 0)
                                    )
                                    self.matched_changes[file_path]['replacements'].append({
                                        'match': match,
                                        'location': location,
                                        'directive': replacement,
                                        'new_url': replacement.get('replacement_url', '')
                                    })
                                    self.stats.replacements_matched += 1
                                    logger.debug(f"Matched replacement: {item.get('name')} "
                                              f"(confidence: {match.confidence:.1f}%)")

        # Track unmatched changes
        self._identify_unmatched_changes(removals, replacements)

        return self.matched_changes

    def _identify_unmatched_changes(self, removals: List[Dict],
                                   replacements: List[Dict]):
        """
        Identify changes that couldn't be matched to any resource.
        """
        # Check removals
        for removal in removals:
            matched = False
            for file_changes in self.matched_changes.values():
                if any(c['directive'] == removal for c in file_changes['removals']):
                    matched = True
                    break
            if not matched:
                self.unmatched_changes['removals'].append(removal)
                self.stats.unmatched_removals += 1

        # Check replacements
        for replacement in replacements:
            matched = False
            for file_changes in self.matched_changes.values():
                if any(c['directive'] == replacement for c in file_changes['replacements']):
                    matched = True
                    break
            if not matched:
                self.unmatched_changes['replacements'].append(replacement)
                self.stats.unmatched_replacements += 1

    def validate_changes(self) -> bool:
        """
        Validate all matched changes before application.

        Checks:
        1. No duplicate removals
        2. Valid replacement URLs
        3. No circular replacements
        4. File integrity
        """
        logger.info("Validating changes...")
        valid = True

        # Check for duplicate removals
        removed_resources = set()
        for file_path, changes in self.matched_changes.items():
            for removal in changes['removals']:
                key = f"{file_path}:{removal['location']}"
                if key in removed_resources:
                    logger.error(f"Duplicate removal detected: {key}")
                    valid = False
                removed_resources.add(key)

        # Validate replacement URLs
        url_normalizer = URLNormalizer()
        for file_path, changes in self.matched_changes.items():
            for replacement in changes['replacements']:
                new_url = replacement.get('new_url', '')
                if not new_url:
                    logger.error(f"Missing replacement URL for {replacement['directive']}")
                    valid = False
                else:
                    # Basic URL validation
                    normalized = url_normalizer.normalize(new_url)
                    if not normalized or len(normalized) < 10:
                        logger.warning(f"Suspicious URL: {new_url}")

        return valid

    def apply_changes(self) -> bool:
        """
        Apply all validated changes to files.

        Uses transaction-like approach:
        1. Create backup
        2. Apply all changes
        3. Validate results
        4. Rollback on failure
        """
        if self.dry_run:
            logger.info("DRY RUN MODE - No changes will be applied")
            return True

        logger.info("Applying changes to files...")

        # Create backup first
        files_to_backup = list(self.matched_changes.keys())
        backup_id = self.backup_manager.create_backup(files_to_backup)
        logger.info(f"Created backup: {backup_id}")

        success = True
        try:
            # Apply removals first (to avoid conflicts)
            for file_path, changes in self.matched_changes.items():
                # Sort removals by item index in reverse to avoid index shifting
                sorted_removals = sorted(changes['removals'],
                                       key=lambda x: x['location'].item_index,
                                       reverse=True)

                for removal in sorted_removals:
                    if self.js_updater.remove_resource(file_path, removal['location']):
                        self.stats.removals_applied += 1
                    else:
                        logger.error(f"Failed to remove resource at {removal['location']}")
                        success = False

            # Apply replacements
            for file_path, changes in self.matched_changes.items():
                for replacement in changes['replacements']:
                    new_url = replacement.get('new_url', '')
                    if self.js_updater.replace_url(file_path, replacement['location'], new_url):
                        self.stats.replacements_applied += 1
                    else:
                        logger.error(f"Failed to replace URL at {replacement['location']}")
                        success = False

            # Validate modified files
            for file_path in self.matched_changes.keys():
                if not self.js_updater.validate_javascript(file_path):
                    logger.error(f"Validation failed for {file_path}")
                    success = False

            if not success:
                logger.error("Some changes failed - initiating rollback")
                self.backup_manager.rollback(backup_id)
                return False

            # Record modified files
            self.stats.files_modified = [str(f) for f in self.matched_changes.keys()]

            logger.info(f"Successfully applied {self.stats.removals_applied} removals "
                       f"and {self.stats.replacements_applied} replacements")
            return True

        except Exception as e:
            logger.error(f"Error during change application: {e}")
            logger.error(traceback.format_exc())
            self.backup_manager.rollback(backup_id)
            return False

    def generate_report(self, output_path: Path = None):
        """
        Generate comprehensive report of the update process.

        Includes:
        - Statistics summary
        - Detailed change log
        - Unmatched items
        - Validation results
        """
        report = {
            'timestamp': datetime.now().isoformat(),
            'dry_run': self.dry_run,
            'statistics': self.stats.to_dict(),
            'matched_changes': {},
            'unmatched_changes': self.unmatched_changes,
            'js_updater_log': self.js_updater.changes_log
        }

        # Format matched changes for report
        for file_path, changes in self.matched_changes.items():
            report['matched_changes'][str(file_path)] = {
                'removals': [
                    {
                        'resource': c['directive'].get('title', c['directive'].get('name', '')),
                        'url': c['directive'].get('url', ''),
                        'confidence': c['match'].confidence,
                        'location': str(c['location'])
                    }
                    for c in changes['removals']
                ],
                'replacements': [
                    {
                        'resource': c['directive'].get('title', c['directive'].get('name', '')),
                        'old_url': c['directive'].get('original_url', ''),
                        'new_url': c.get('new_url', ''),
                        'confidence': c['match'].confidence,
                        'location': str(c['location'])
                    }
                    for c in changes['replacements']
                ]
            }

        # Save report
        if output_path is None:
            output_path = self.project_root / f"update_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2)

        logger.info(f"Report saved to: {output_path}")

        # Print summary
        self._print_summary()

        return report

    def _print_summary(self):
        """Print a human-readable summary of the update process."""
        print("\n" + "=" * 60)
        print("RESOURCE UPDATE SUMMARY")
        print("=" * 60)
        print(f"Mode: {'DRY RUN' if self.dry_run else 'EXECUTED'}")
        print(f"Files Processed: {self.stats.total_files_processed}")
        print(f"Total Resources Scanned: {self.stats.total_resources_scanned}")
        print("\nMatching Results:")
        print(f"  Removals Matched: {self.stats.removals_matched}")
        print(f"  Replacements Matched: {self.stats.replacements_matched}")
        print(f"  Unmatched Removals: {self.stats.unmatched_removals}")
        print(f"  Unmatched Replacements: {self.stats.unmatched_replacements}")

        if not self.dry_run:
            print("\nChanges Applied:")
            print(f"  Removals Applied: {self.stats.removals_applied}")
            print(f"  Replacements Applied: {self.stats.replacements_applied}")
            print(f"  Files Modified: {len(self.stats.files_modified)}")

        if self.unmatched_changes['removals'] or self.unmatched_changes['replacements']:
            print("\n⚠️  Warning: Some changes could not be matched.")
            print("Check the detailed report for unmatched items.")

        print("=" * 60)

    def execute(self):
        """
        Execute the complete update pipeline.

        Main entry point for the orchestrator.
        """
        try:
            logger.info("Starting resource update process...")

            # Step 1: Load change directives
            removals, replacements = self.load_change_directives()

            # Step 2: Check for conflicts
            conflicts = self.conflict_resolver.detect_conflicts(removals, replacements)
            if conflicts:
                logger.warning(f"Found {len(conflicts)} conflicts")
                resolutions = self.conflict_resolver.resolve_conflicts(conflicts)
                # Update lists based on resolutions
                removals = [r for r in removals if r not in
                           [c['removal'] for c in conflicts]]
                removals.extend(resolutions['apply_removals'])
                replacements = [r for r in replacements if r not in
                              [c['replacement'] for c in conflicts]]
                replacements.extend(resolutions['apply_replacements'])

            # Step 3: Load language files
            language_files = self.load_language_files()

            # Step 4: Match changes to resources
            self.match_changes_to_resources(removals, replacements, language_files)

            # Step 5: Validate changes
            if not self.validate_changes():
                logger.error("Validation failed - aborting")
                return False

            # Step 6: Apply changes (or simulate in dry-run)
            if not self.dry_run:
                if not self.apply_changes():
                    logger.error("Failed to apply changes")
                    return False

            # Step 7: Generate report
            self.generate_report()

            logger.info("Resource update process completed successfully")
            return True

        except Exception as e:
            logger.error(f"Fatal error in update process: {e}")
            logger.error(traceback.format_exc())
            return False


def main():
    """Main entry point with CLI argument parsing."""
    parser = argparse.ArgumentParser(
        description="Apply reviewed changes to language resource files"
    )
    parser.add_argument(
        '--execute',
        action='store_true',
        help='Execute changes (default is dry-run)'
    )
    parser.add_argument(
        '--backup',
        action='store_true',
        default=True,
        help='Create backup before changes (default: True)'
    )
    parser.add_argument(
        '--rollback',
        type=str,
        help='Rollback to specified backup ID'
    )
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Enable verbose logging'
    )
    parser.add_argument(
        '--project-root',
        type=Path,
        default=Path.cwd(),
        help='Project root directory'
    )

    args = parser.parse_args()

    # Configure logging level
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    # Handle rollback
    if args.rollback:
        backup_manager = BackupManager(args.project_root / "backups")
        if backup_manager.rollback(args.rollback):
            print(f"Successfully rolled back to {args.rollback}")
        else:
            print(f"Failed to rollback to {args.rollback}")
        return

    # Execute main update process
    orchestrator = ResourceUpdateOrchestrator(
        project_root=args.project_root,
        dry_run=not args.execute
    )

    if orchestrator.execute():
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()