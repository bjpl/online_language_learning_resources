#!/usr/bin/env python3
"""
Safe Resource Update Runner
============================
Enhanced version with deduplication and comprehensive reporting.

This script:
1. Deduplicates change directives
2. Provides detailed matching analysis
3. Generates actionable reports
4. Ensures safe execution
"""

import json
import sys
from pathlib import Path
from collections import defaultdict
from datetime import datetime
import logging

# Import our modules
from apply_resource_updates import ResourceUpdateOrchestrator
from resource_updater_core import URLNormalizer

logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)


def deduplicate_changes(removals, replacements):
    """
    Remove duplicate entries from change lists.

    Uses URL normalization for accurate deduplication.
    """
    normalizer = URLNormalizer()

    # Deduplicate removals
    seen_removals = set()
    unique_removals = []

    for removal in removals:
        url = removal.get('url', removal.get('original_url', ''))
        if url:
            normalized = normalizer.normalize(url)
            key = f"{normalized}:{removal.get('title', '')}"
            if key not in seen_removals:
                seen_removals.add(key)
                unique_removals.append(removal)

    # Deduplicate replacements
    seen_replacements = set()
    unique_replacements = []

    for replacement in replacements:
        url = replacement.get('original_url', replacement.get('url', ''))
        if url:
            normalized = normalizer.normalize(url)
            key = f"{normalized}:{replacement.get('title', '')}"
            if key not in seen_replacements:
                seen_replacements.add(key)
                unique_replacements.append(replacement)

    return unique_removals, unique_replacements


def analyze_unmatched(unmatched_changes):
    """
    Analyze unmatched changes to understand why they didn't match.
    """
    analysis = {
        'by_language': defaultdict(list),
        'missing_urls': [],
        'suspicious_urls': [],
        'recommendations': []
    }

    normalizer = URLNormalizer()

    for removal in unmatched_changes.get('removals', []):
        lang = removal.get('language', 'unknown')
        analysis['by_language'][lang].append(removal)

        url = removal.get('url', '')
        if not url:
            analysis['missing_urls'].append(removal)
        elif 'YouTube' in url or 'Reddit' in url or 'Discord' in url:
            analysis['suspicious_urls'].append(removal)

    # Generate recommendations
    if analysis['missing_urls']:
        analysis['recommendations'].append(
            f"Found {len(analysis['missing_urls'])} entries without URLs - these cannot be matched"
        )

    if analysis['suspicious_urls']:
        analysis['recommendations'].append(
            f"Found {len(analysis['suspicious_urls'])} non-standard URLs (social media, etc.) - may need manual review"
        )

    return analysis


def generate_execution_plan(matched_changes):
    """
    Generate a detailed execution plan showing what will be changed.
    """
    plan = []

    for file_path, changes in matched_changes.items():
        file_name = Path(file_path).name
        language = file_name.replace('-data.js', '')

        if changes['removals'] or changes['replacements']:
            plan.append({
                'file': file_name,
                'language': language,
                'removals': len(changes['removals']),
                'replacements': len(changes['replacements']),
                'details': {
                    'removals': [
                        {
                            'name': r['directive'].get('title', r['directive'].get('name', 'Unknown')),
                            'url': r['directive'].get('url', ''),
                            'confidence': r['match'].confidence
                        }
                        for r in changes['removals'][:5]  # Show first 5
                    ],
                    'replacements': [
                        {
                            'name': r['directive'].get('title', r['directive'].get('name', 'Unknown')),
                            'old_url': r['directive'].get('original_url', ''),
                            'new_url': r.get('new_url', ''),
                            'confidence': r['match'].confidence
                        }
                        for r in changes['replacements'][:5]  # Show first 5
                    ]
                }
            })

    return plan


def main():
    """
    Main execution with enhanced safety and reporting.
    """
    print("\n" + "=" * 70)
    print(" RESOURCE UPDATE SYSTEM - SAFE EXECUTION MODE")
    print("=" * 70)

    project_root = Path.cwd()
    review_dir = project_root / "review_results"

    # Load change directives
    print("\n📂 Loading change directives...")

    all_removals = []
    marked_removals_file = review_dir / "marked_review_removals.json"
    if marked_removals_file.exists():
        with open(marked_removals_file, 'r', encoding='utf-8') as f:
            marked = json.load(f)
            all_removals.extend(marked)
            print(f"   ✓ Loaded {len(marked)} removals from marked review")

    link_deletions_file = review_dir / "link_review_deletions.json"
    if link_deletions_file.exists():
        with open(link_deletions_file, 'r', encoding='utf-8') as f:
            link = json.load(f)
            all_removals.extend(link)
            print(f"   ✓ Loaded {len(link)} deletions from link review")

    replacements_file = review_dir / "url_replacements.json"
    replacements = []
    if replacements_file.exists():
        with open(replacements_file, 'r', encoding='utf-8') as f:
            replacements = json.load(f)
            print(f"   ✓ Loaded {len(replacements)} URL replacements")

    # Deduplicate
    print("\n🔍 Deduplicating change directives...")
    unique_removals, unique_replacements = deduplicate_changes(all_removals, replacements)

    print(f"   • Removals: {len(all_removals)} → {len(unique_removals)} unique")
    print(f"   • Replacements: {len(replacements)} → {len(unique_replacements)} unique")

    # Save deduplicated versions
    dedup_dir = project_root / "review_results" / "deduplicated"
    dedup_dir.mkdir(exist_ok=True)

    with open(dedup_dir / "unique_removals.json", 'w', encoding='utf-8') as f:
        json.dump(unique_removals, f, indent=2)

    with open(dedup_dir / "unique_replacements.json", 'w', encoding='utf-8') as f:
        json.dump(unique_replacements, f, indent=2)

    print(f"\n   ✓ Saved deduplicated files to {dedup_dir}")

    # Create temporary files for orchestrator
    temp_marked = dedup_dir / "marked_review_removals.json"
    temp_link = dedup_dir / "link_review_deletions.json"
    temp_replacements = dedup_dir / "url_replacements.json"

    with open(temp_marked, 'w') as f:
        json.dump(unique_removals[:30], f)  # First 30 like original marked

    with open(temp_link, 'w') as f:
        json.dump(unique_removals[30:], f)  # Rest like link deletions

    with open(temp_replacements, 'w') as f:
        json.dump(unique_replacements, f)

    # Run orchestrator with deduplicated data
    print("\n🚀 Running update analysis (DRY RUN)...")
    print("-" * 50)

    orchestrator = ResourceUpdateOrchestrator(project_root, dry_run=True)
    orchestrator.review_dir = dedup_dir  # Use deduplicated directory

    # Execute
    success = orchestrator.execute()

    if success:
        print("\n✅ Analysis completed successfully!")

        # Generate execution plan
        print("\n📋 EXECUTION PLAN")
        print("-" * 50)

        plan = generate_execution_plan(orchestrator.matched_changes)

        for file_plan in plan:
            print(f"\n📁 {file_plan['file']} ({file_plan['language'].upper()})")
            print(f"   • {file_plan['removals']} removals")
            print(f"   • {file_plan['replacements']} replacements")

            if file_plan['details']['removals']:
                print("\n   Removals (sample):")
                for r in file_plan['details']['removals']:
                    print(f"     - {r['name'][:50]}... (confidence: {r['confidence']:.1f}%)")

            if file_plan['details']['replacements']:
                print("\n   Replacements (sample):")
                for r in file_plan['details']['replacements']:
                    print(f"     - {r['name'][:50]}...")
                    print(f"       {r['old_url'][:60]}...")
                    print(f"       → {r['new_url'][:60]}...")

        # Analyze unmatched
        if orchestrator.unmatched_changes['removals'] or orchestrator.unmatched_changes['replacements']:
            print("\n⚠️  UNMATCHED CHANGES")
            print("-" * 50)

            analysis = analyze_unmatched(orchestrator.unmatched_changes)

            print(f"\nUnmatched by language:")
            for lang, items in analysis['by_language'].items():
                print(f"   • {lang}: {len(items)} items")

            print(f"\nRecommendations:")
            for rec in analysis['recommendations']:
                print(f"   • {rec}")

        # Summary
        print("\n" + "=" * 70)
        print(" SUMMARY")
        print("=" * 70)
        files_to_modify = len([f for f, c in orchestrator.matched_changes.items()
                              if c['removals'] or c['replacements']])
        print(f" Total files to modify: {files_to_modify}")
        print(f" Total removals to apply: {orchestrator.stats.removals_matched}")
        print(f" Total replacements to apply: {orchestrator.stats.replacements_matched}")
        print(f" Unmatched removals: {orchestrator.stats.unmatched_removals}")
        print(f" Unmatched replacements: {orchestrator.stats.unmatched_replacements}")

        print("\n📄 Reports saved to:")
        print(f"   • {project_root}/update_report_*.json")
        print(f"   • {dedup_dir}/")

        print("\n" + "=" * 70)
        print(" NEXT STEPS")
        print("=" * 70)
        print("\n To execute these changes:")
        print("   python scripts/apply_resource_updates.py --execute --backup")
        print("\n To rollback if needed:")
        print("   python scripts/apply_resource_updates.py --rollback <backup_id>")
        print("\n" + "=" * 70)

        return 0
    else:
        print("\n❌ Analysis failed - check logs for details")
        return 1


if __name__ == "__main__":
    sys.exit(main())