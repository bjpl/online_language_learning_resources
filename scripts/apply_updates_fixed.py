#!/usr/bin/env python3
"""
Fixed Resource Update Executor
================================
Enhanced version that properly handles duplicates and executes changes.
"""

import json
import sys
from pathlib import Path
from datetime import datetime
from collections import defaultdict
import shutil
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

from resource_updater_core import (
    URLNormalizer, ResourceMatcher, BackupManager
)
from javascript_updater import (
    JavaScriptParser, JavaScriptUpdater, ResourceLocation
)


class FixedResourceUpdater:
    """Fixed updater that handles duplicates properly"""

    def __init__(self, project_root: Path, dry_run: bool = True):
        self.project_root = project_root
        self.dry_run = dry_run
        self.js_dir = project_root / "assets" / "js"
        self.review_dir = project_root / "review_results"

        # Initialize components
        self.normalizer = URLNormalizer()
        self.matcher = ResourceMatcher()
        self.parser = JavaScriptParser()
        self.updater = JavaScriptUpdater(dry_run=dry_run)
        self.backup_manager = BackupManager(project_root / "backups")

        # Track what we've already processed
        self.processed_resources = set()
        self.changes_to_apply = defaultdict(lambda: {
            'removals': [],
            'replacements': []
        })

    def load_and_deduplicate_changes(self):
        """Load and properly deduplicate all changes"""
        logger.info("Loading change directives...")

        # Load all removals
        all_removals = []

        marked_file = self.review_dir / "marked_review_removals.json"
        if marked_file.exists():
            with open(marked_file, 'r', encoding='utf-8') as f:
                all_removals.extend(json.load(f))

        link_file = self.review_dir / "link_review_deletions.json"
        if link_file.exists():
            with open(link_file, 'r', encoding='utf-8') as f:
                all_removals.extend(json.load(f))

        # Load replacements
        replacements = []
        repl_file = self.review_dir / "url_replacements.json"
        if repl_file.exists():
            with open(repl_file, 'r', encoding='utf-8') as f:
                replacements = json.load(f)

        # Deduplicate based on normalized URL
        seen_removals = {}
        unique_removals = []

        for removal in all_removals:
            url = removal.get('url', removal.get('original_url', ''))
            if url:
                normalized = self.normalizer.normalize(url)
                if normalized not in seen_removals:
                    seen_removals[normalized] = removal
                    unique_removals.append(removal)

        # Deduplicate replacements
        seen_replacements = {}
        unique_replacements = []

        for replacement in replacements:
            url = replacement.get('original_url', replacement.get('url', ''))
            if url:
                normalized = self.normalizer.normalize(url)
                if normalized not in seen_replacements:
                    seen_replacements[normalized] = replacement
                    unique_replacements.append(replacement)

        logger.info(f"Deduplicated: {len(all_removals)} → {len(unique_removals)} removals")
        logger.info(f"Deduplicated: {len(replacements)} → {len(unique_replacements)} replacements")

        return unique_removals, unique_replacements

    def match_and_apply_changes(self, removals, replacements):
        """Match changes to resources and apply them"""

        # Get all JS files
        js_files = [f for f in self.js_dir.glob("*-data.js")
                   if 'backup' not in f.name and 'simple' not in f.name]

        logger.info(f"Processing {len(js_files)} language files...")

        stats = {
            'files_processed': 0,
            'removals_applied': 0,
            'replacements_applied': 0,
            'errors': 0
        }

        # Process each file
        for js_file in js_files:
            language = js_file.stem.replace('-data', '')
            logger.info(f"\nProcessing {language} ({js_file.name})...")

            try:
                # Parse the file
                parsed_data, lines = self.parser.parse_file(js_file)
                stats['files_processed'] += 1

                # Track changes for this file
                file_changes = {
                    'removals': [],
                    'replacements': []
                }

                # Process removals
                removals_for_lang = [r for r in removals
                                    if not r.get('language') or
                                    r.get('language', '').lower() == language.lower()]

                for removal in removals_for_lang:
                    # Find matching resources in the file
                    removal_url = removal.get('url', '')
                    removal_name = removal.get('title', removal.get('name', ''))

                    if removal_url:
                        location = self.parser.find_resource_location(
                            parsed_data, removal_url, removal_name
                        )

                        if location:
                            # Create a unique key for this resource
                            resource_key = f"{js_file}:{location.resource_type}:{location.category_index}:{location.item_index}"

                            if resource_key not in self.processed_resources:
                                self.processed_resources.add(resource_key)
                                location.file_path = js_file
                                file_changes['removals'].append(location)
                                logger.debug(f"  - Will remove: {removal_name or removal_url}")

                # Process replacements
                replacements_for_lang = [r for r in replacements
                                       if not r.get('language') or
                                       r.get('language', '').lower() == language.lower()]

                for replacement in replacements_for_lang:
                    old_url = replacement.get('original_url', '')
                    new_url = replacement.get('replacement_url', '')
                    repl_name = replacement.get('title', replacement.get('name', ''))

                    if old_url and new_url:
                        location = self.parser.find_resource_location(
                            parsed_data, old_url, repl_name
                        )

                        if location:
                            resource_key = f"{js_file}:{location.resource_type}:{location.category_index}:{location.item_index}"

                            # Don't replace if we're removing it
                            if resource_key not in self.processed_resources:
                                location.file_path = js_file
                                file_changes['replacements'].append({
                                    'location': location,
                                    'new_url': new_url
                                })
                                logger.debug(f"  - Will replace URL for: {repl_name or old_url}")

                # Apply changes to this file if not dry run
                if file_changes['removals'] or file_changes['replacements']:
                    logger.info(f"  Found {len(file_changes['removals'])} removals, "
                              f"{len(file_changes['replacements'])} replacements")

                    if not self.dry_run:
                        # Apply removals (in reverse order to maintain indices)
                        for location in sorted(file_changes['removals'],
                                              key=lambda x: x.item_index,
                                              reverse=True):
                            if self.updater.remove_resource(js_file, location):
                                stats['removals_applied'] += 1
                            else:
                                stats['errors'] += 1

                        # Apply replacements
                        for repl in file_changes['replacements']:
                            if self.updater.replace_url(js_file, repl['location'],
                                                       repl['new_url']):
                                stats['replacements_applied'] += 1
                            else:
                                stats['errors'] += 1

                        # Validate the file
                        if not self.updater.validate_javascript(js_file):
                            logger.error(f"  ⚠️ Validation failed for {js_file.name}")
                            stats['errors'] += 1
                        else:
                            logger.info(f"  ✅ Successfully updated {js_file.name}")

                    self.changes_to_apply[js_file] = file_changes

            except Exception as e:
                logger.error(f"  ❌ Error processing {js_file.name}: {e}")
                stats['errors'] += 1

        return stats

    def execute(self):
        """Main execution"""
        try:
            print("\n" + "=" * 70)
            print(" RESOURCE UPDATE SYSTEM - EXECUTION")
            print("=" * 70)

            # Load and deduplicate
            removals, replacements = self.load_and_deduplicate_changes()

            # Create backup if not dry run
            if not self.dry_run:
                logger.info("\n📦 Creating backup...")
                js_files = list(self.js_dir.glob("*-data.js"))
                backup_id = self.backup_manager.create_backup(js_files)
                logger.info(f"✅ Backup created: {backup_id}")

            # Apply changes
            logger.info("\n🔧 Applying changes...")
            stats = self.match_and_apply_changes(removals, replacements)

            # Generate report
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            report = {
                'timestamp': datetime.now().isoformat(),
                'dry_run': self.dry_run,
                'statistics': stats,
                'changes_by_file': {}
            }

            for file_path, changes in self.changes_to_apply.items():
                report['changes_by_file'][str(file_path)] = {
                    'removals': len(changes['removals']),
                    'replacements': len(changes['replacements'])
                }

            # Save report
            report_file = self.project_root / f"update_report_{timestamp}.json"
            with open(report_file, 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2)

            # Print summary
            print("\n" + "=" * 70)
            print(" EXECUTION SUMMARY")
            print("=" * 70)
            print(f" Mode: {'DRY RUN' if self.dry_run else 'EXECUTED'}")
            print(f" Files Processed: {stats['files_processed']}")

            if not self.dry_run:
                print(f" Removals Applied: {stats['removals_applied']}")
                print(f" Replacements Applied: {stats['replacements_applied']}")
                if stats['errors'] > 0:
                    print(f" ⚠️ Errors: {stats['errors']}")
            else:
                total_removals = sum(len(c['removals']) for c in self.changes_to_apply.values())
                total_replacements = sum(len(c['replacements']) for c in self.changes_to_apply.values())
                print(f" Removals Found: {total_removals}")
                print(f" Replacements Found: {total_replacements}")

            print(f"\n 📄 Report saved to: {report_file}")
            print("=" * 70)

            if self.dry_run:
                print("\n To execute these changes, run:")
                print("   python scripts/apply_updates_fixed.py --execute")

            return stats['errors'] == 0

        except Exception as e:
            logger.error(f"Fatal error: {e}")
            import traceback
            traceback.print_exc()
            return False


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Apply resource updates")
    parser.add_argument('--execute', action='store_true',
                       help='Execute changes (default is dry-run)')
    parser.add_argument('--verbose', action='store_true',
                       help='Enable verbose output')
    args = parser.parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    project_root = Path.cwd()
    updater = FixedResourceUpdater(project_root, dry_run=not args.execute)

    success = updater.execute()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()