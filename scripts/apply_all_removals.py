#!/usr/bin/env python3
"""
Apply ALL Removals and Replacements
=====================================
This version removes ALL instances of marked resources across ALL languages.
If a resource is marked for removal, every occurrence gets removed.
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


class ComprehensiveResourceUpdater:
    """Removes ALL instances of marked resources across ALL language files"""

    def __init__(self, project_root: Path, dry_run: bool = True):
        self.project_root = project_root
        self.dry_run = dry_run
        self.js_dir = project_root / "assets" / "js"
        self.review_dir = project_root / "review_results"

        # Initialize components
        self.normalizer = URLNormalizer()
        self.parser = JavaScriptParser()
        self.updater = JavaScriptUpdater(dry_run=dry_run)
        self.backup_manager = BackupManager(project_root / "backups")

        # Track all changes
        self.all_removals = []
        self.all_replacements = []
        self.changes_by_file = defaultdict(lambda: {
            'removals': [],
            'replacements': []
        })

    def load_all_changes(self):
        """Load all removal and replacement directives"""
        logger.info("Loading all change directives...")

        # Load all removals
        removals = []

        marked_file = self.review_dir / "marked_review_removals.json"
        if marked_file.exists():
            with open(marked_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                removals.extend(data)
                logger.info(f"  Loaded {len(data)} removals from marked review")

        link_file = self.review_dir / "link_review_deletions.json"
        if link_file.exists():
            with open(link_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                removals.extend(data)
                logger.info(f"  Loaded {len(data)} deletions from link review")

        # Build set of URLs to remove (normalized)
        urls_to_remove = set()
        names_to_remove = set()

        for removal in removals:
            url = removal.get('url', removal.get('original_url', ''))
            if url:
                # Add both original and normalized versions
                urls_to_remove.add(url)
                urls_to_remove.add(self.normalizer.normalize(url))

            name = removal.get('title', removal.get('name', ''))
            if name:
                names_to_remove.add(name.lower().strip())

        # Load replacements
        replacements = []
        repl_file = self.review_dir / "url_replacements.json"
        if repl_file.exists():
            with open(repl_file, 'r', encoding='utf-8') as f:
                replacements = json.load(f)
                logger.info(f"  Loaded {len(replacements)} URL replacements")

        # Build replacement map
        url_replacements = {}
        for replacement in replacements:
            old_url = replacement.get('original_url', replacement.get('url', ''))
            new_url = replacement.get('replacement_url', replacement.get('new_url', ''))
            if old_url and new_url:
                url_replacements[old_url] = new_url
                url_replacements[self.normalizer.normalize(old_url)] = new_url

        self.all_removals = removals
        self.all_replacements = replacements

        logger.info(f"\n  Total unique URLs to remove: {len(urls_to_remove)}")
        logger.info(f"  Total unique names to remove: {len(names_to_remove)}")
        logger.info(f"  Total URL replacements: {len(url_replacements)}")

        return urls_to_remove, names_to_remove, url_replacements

    def process_file(self, js_file: Path, urls_to_remove: set,
                    names_to_remove: set, url_replacements: dict):
        """Process a single language file"""

        language = js_file.stem.replace('-data', '')
        logger.info(f"\n📁 Processing {language.upper()} ({js_file.name})...")

        try:
            # Parse the file
            parsed_data, lines = self.parser.parse_file(js_file)

            removals = []
            replacements = []

            # Check each resource in the file
            for resource_type, categories in parsed_data.get('resources', {}).items():
                for cat_idx, category in enumerate(categories):
                    items = category.get('items', [])

                    # Process in reverse to avoid index shifting when removing
                    for item_idx in range(len(items) - 1, -1, -1):
                        item = items[item_idx]
                        item_url = item.get('url', '')
                        item_name = item.get('name', '')

                        # Check if this resource should be removed
                        should_remove = False

                        # Check URL
                        if item_url:
                            if (item_url in urls_to_remove or
                                self.normalizer.normalize(item_url) in urls_to_remove):
                                should_remove = True
                                logger.debug(f"    - Marking for removal (URL match): {item_name or item_url}")

                        # Check name (only if not already marked)
                        if not should_remove and item_name:
                            if item_name.lower().strip() in names_to_remove:
                                should_remove = True
                                logger.debug(f"    - Marking for removal (name match): {item_name}")

                        if should_remove:
                            location = ResourceLocation(
                                file_path=js_file,
                                resource_type=resource_type,
                                category_index=cat_idx,
                                item_index=item_idx,
                                line_number=item.get('_line_number', 0)
                            )
                            removals.append({
                                'location': location,
                                'name': item_name,
                                'url': item_url
                            })

                        # Check if URL needs replacement (only if not removing)
                        elif item_url in url_replacements:
                            new_url = url_replacements[item_url]
                            location = ResourceLocation(
                                file_path=js_file,
                                resource_type=resource_type,
                                category_index=cat_idx,
                                item_index=item_idx,
                                line_number=item.get('_url_line', 0)
                            )
                            replacements.append({
                                'location': location,
                                'name': item_name,
                                'old_url': item_url,
                                'new_url': new_url
                            })
                            logger.debug(f"    - Marking for URL replacement: {item_name or item_url}")
                        elif self.normalizer.normalize(item_url) in url_replacements:
                            new_url = url_replacements[self.normalizer.normalize(item_url)]
                            location = ResourceLocation(
                                file_path=js_file,
                                resource_type=resource_type,
                                category_index=cat_idx,
                                item_index=item_idx,
                                line_number=item.get('_url_line', 0)
                            )
                            replacements.append({
                                'location': location,
                                'name': item_name,
                                'old_url': item_url,
                                'new_url': new_url
                            })
                            logger.debug(f"    - Marking for URL replacement: {item_name or item_url}")

            # Store changes for this file
            self.changes_by_file[js_file] = {
                'removals': removals,
                'replacements': replacements
            }

            if removals or replacements:
                logger.info(f"  📊 Found {len(removals)} removals, {len(replacements)} replacements")

            return len(removals), len(replacements), 0

        except Exception as e:
            logger.error(f"  ❌ Error processing {js_file.name}: {e}")
            return 0, 0, 1

    def apply_changes(self):
        """Apply all changes to files"""
        if self.dry_run:
            logger.info("\n🔍 DRY RUN MODE - No changes will be applied")
            return

        logger.info("\n⚡ APPLYING CHANGES...")

        stats = {
            'files_modified': 0,
            'removals_applied': 0,
            'replacements_applied': 0,
            'errors': 0
        }

        for js_file, changes in self.changes_by_file.items():
            if not changes['removals'] and not changes['replacements']:
                continue

            logger.info(f"\n  Updating {js_file.name}...")

            # Apply removals in reverse order to maintain indices
            removals_sorted = sorted(changes['removals'],
                                    key=lambda x: (x['location'].category_index,
                                                 x['location'].item_index),
                                    reverse=True)

            for removal in removals_sorted:
                if self.updater.remove_resource(js_file, removal['location']):
                    stats['removals_applied'] += 1
                    logger.debug(f"    ✓ Removed: {removal['name'] or removal['url']}")
                else:
                    stats['errors'] += 1
                    logger.error(f"    ✗ Failed to remove: {removal['name'] or removal['url']}")

            # Apply replacements
            for replacement in changes['replacements']:
                if self.updater.replace_url(js_file, replacement['location'],
                                          replacement['new_url']):
                    stats['replacements_applied'] += 1
                    logger.debug(f"    ✓ Replaced URL for: {replacement['name'] or replacement['old_url']}")
                else:
                    stats['errors'] += 1
                    logger.error(f"    ✗ Failed to replace URL for: {replacement['name']}")

            # Validate the file
            if self.updater.validate_javascript(js_file):
                stats['files_modified'] += 1
                logger.info(f"    ✅ Successfully updated and validated")
            else:
                stats['errors'] += 1
                logger.error(f"    ⚠️ Validation failed!")

        return stats

    def execute(self):
        """Main execution"""
        try:
            print("\n" + "=" * 70)
            print(" COMPREHENSIVE RESOURCE UPDATE SYSTEM")
            print(" Removing ALL instances across ALL languages")
            print("=" * 70)

            # Load all changes
            urls_to_remove, names_to_remove, url_replacements = self.load_all_changes()

            # Get all JS files
            js_files = sorted([f for f in self.js_dir.glob("*-data.js")
                             if 'backup' not in f.name and 'simple' not in f.name])

            # Create backup if not dry run
            if not self.dry_run:
                logger.info("\n📦 Creating backup of all files...")
                backup_id = self.backup_manager.create_backup(js_files)
                logger.info(f"✅ Backup created: {backup_id}")
                logger.info(f"   Backup location: backups/{backup_id}/")

            # Process each file
            total_removals = 0
            total_replacements = 0
            total_errors = 0

            for js_file in js_files:
                removals, replacements, errors = self.process_file(
                    js_file, urls_to_remove, names_to_remove, url_replacements
                )
                total_removals += removals
                total_replacements += replacements
                total_errors += errors

            # Apply changes if not dry run
            if not self.dry_run:
                stats = self.apply_changes()
            else:
                stats = None

            # Generate report
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            report = {
                'timestamp': datetime.now().isoformat(),
                'dry_run': self.dry_run,
                'summary': {
                    'files_processed': len(js_files),
                    'total_removals_found': total_removals,
                    'total_replacements_found': total_replacements,
                    'unique_urls_to_remove': len(urls_to_remove),
                    'unique_names_to_remove': len(names_to_remove),
                    'url_replacements': len(url_replacements)
                }
            }

            if stats:
                report['execution_stats'] = stats

            # Add details by file
            report['changes_by_file'] = {}
            for js_file, changes in self.changes_by_file.items():
                if changes['removals'] or changes['replacements']:
                    report['changes_by_file'][js_file.name] = {
                        'removals': len(changes['removals']),
                        'replacements': len(changes['replacements']),
                        'removal_details': [
                            {'name': r['name'], 'url': r['url']}
                            for r in changes['removals'][:10]  # First 10
                        ],
                        'replacement_details': [
                            {'name': r['name'], 'old': r['old_url'], 'new': r['new_url']}
                            for r in changes['replacements'][:10]  # First 10
                        ]
                    }

            # Save report
            report_file = self.project_root / f"comprehensive_update_report_{timestamp}.json"
            with open(report_file, 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=2)

            # Print summary
            print("\n" + "=" * 70)
            print(" EXECUTION SUMMARY")
            print("=" * 70)
            print(f" Mode: {'DRY RUN - No changes applied' if self.dry_run else '✅ CHANGES APPLIED'}")
            print(f" Files Processed: {len(js_files)}")
            print(f" Total Removals Found: {total_removals}")
            print(f" Total Replacements Found: {total_replacements}")

            if not self.dry_run and stats:
                print(f"\n Applied Changes:")
                print(f"   Files Modified: {stats['files_modified']}")
                print(f"   Removals Applied: {stats['removals_applied']}")
                print(f"   Replacements Applied: {stats['replacements_applied']}")
                if stats['errors'] > 0:
                    print(f"   ⚠️ Errors: {stats['errors']}")

            print(f"\n 📄 Detailed report saved to:")
            print(f"    {report_file}")

            if self.dry_run:
                print("\n" + "=" * 70)
                print(" READY TO EXECUTE")
                print("=" * 70)
                print(" Review the numbers above. To apply these changes, run:")
                print("   python scripts/apply_all_removals.py --execute")
                print("\n ⚠️  This will remove ALL instances of marked resources")
                print("     across ALL language files. A backup will be created.")
                print("=" * 70)

            return total_errors == 0

        except Exception as e:
            logger.error(f"Fatal error: {e}")
            import traceback
            traceback.print_exc()
            return False


def main():
    import argparse
    parser = argparse.ArgumentParser(
        description="Apply ALL removals and replacements across ALL language files"
    )
    parser.add_argument('--execute', action='store_true',
                       help='Execute changes (default is dry-run)')
    parser.add_argument('--verbose', action='store_true',
                       help='Enable verbose output')
    args = parser.parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    project_root = Path.cwd()
    updater = ComprehensiveResourceUpdater(project_root, dry_run=not args.execute)

    success = updater.execute()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()