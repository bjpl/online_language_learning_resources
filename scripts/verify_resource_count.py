#!/usr/bin/env python3
"""
Verify the actual resource count by parsing JavaScript files properly.
"""
import json
import re
from pathlib import Path
from typing import Dict, List, Set, Tuple
from collections import defaultdict

def parse_js_resources(file_path: Path) -> Dict[str, List[Dict]]:
    """Parse JavaScript file and extract all resources with their details."""
    content = file_path.read_text(encoding='utf-8')
    language = file_path.stem.replace('-data', '')

    resources = {
        'courses': [],
        'apps': [],
        'books': [],
        'audio': [],
        'practice': []
    }

    # Find the resources object
    resources_match = re.search(r'resources\s*:\s*\{(.*?)\n\s*\}\s*\n\s*\}', content, re.DOTALL)
    if not resources_match:
        return resources

    resources_content = resources_match.group(1)

    # Parse each section
    for section_type in ['courses', 'apps', 'books', 'audio', 'practice']:
        # Find section content
        pattern = rf'{section_type}\s*:\s*\[(.*?)\](?:\s*,|\s*$)'
        section_match = re.search(pattern, resources_content, re.DOTALL)

        if section_match:
            section_content = section_match.group(1)

            # Check if this section has categories with items
            if 'category:' in section_content and 'items:' in section_content:
                # Parse categories
                category_pattern = r'\{\s*category:\s*["\']([^"\']+)["\'][^}]*?items:\s*\[(.*?)\]\s*\}'
                category_matches = re.finditer(category_pattern, section_content, re.DOTALL)

                for cat_match in category_matches:
                    category_name = cat_match.group(1)
                    items_content = cat_match.group(2)

                    # Parse items in category
                    item_pattern = r'\{\s*name:\s*["\']([^"\']+)["\'][^}]*?\}'
                    item_matches = re.finditer(item_pattern, items_content, re.DOTALL)

                    for item_match in item_matches:
                        item_name = item_match.group(1)
                        item_full = item_match.group(0)

                        # Extract URL if present
                        url_match = re.search(r'url:\s*["\']([^"\']+)["\']', item_full)
                        url = url_match.group(1) if url_match else None

                        resources[section_type].append({
                            'name': item_name,
                            'url': url,
                            'category': category_name,
                            'language': language
                        })
            else:
                # Direct items array (like apps usually are)
                item_pattern = r'\{\s*name:\s*["\']([^"\']+)["\'][^}]*?\}'
                item_matches = re.finditer(item_pattern, section_content, re.DOTALL)

                for item_match in item_matches:
                    item_name = item_match.group(1)
                    item_full = item_match.group(0)

                    # Extract URL if present
                    url_match = re.search(r'url:\s*["\']([^"\']+)["\']', item_full)
                    url = url_match.group(1) if url_match else None

                    resources[section_type].append({
                        'name': item_name,
                        'url': url,
                        'category': None,
                        'language': language
                    })

    return resources

def main():
    """Main function to verify resource counts."""
    project_root = Path(r"C:\Users\brand\Development\Project_Workspace\active-development\online_language_learning_resources")
    js_dir = project_root / "assets" / "js"

    # Language data files
    language_files = [
        'dutch-data.js', 'danish-data.js', 'portuguese-data.js',
        'italian-data.js', 'indonesian-data.js', 'korean-data.js',
        'hindi-data.js', 'swahili-data.js', 'japanese-data.js',
        'swedish-data.js', 'finnish-data.js', 'polish-data.js',
        'vietnamese-data.js'
    ]

    all_resources = defaultdict(list)
    language_totals = {}

    print("=" * 80)
    print("DETAILED RESOURCE COUNT VERIFICATION")
    print("=" * 80)

    # Parse each language file
    for file_name in language_files:
        file_path = js_dir / file_name
        if file_path.exists():
            language = file_name.replace('-data.js', '').title()
            resources = parse_js_resources(file_path)

            lang_total = 0
            lang_counts = {}

            for section_type, items in resources.items():
                all_resources[section_type].extend(items)
                lang_counts[section_type] = len(items)
                lang_total += len(items)

            language_totals[language] = {
                'total': lang_total,
                'breakdown': lang_counts
            }

            print(f"\n{language}: {lang_total} resources")
            for section_type, count in lang_counts.items():
                if count > 0:
                    print(f"  {section_type}: {count}")

    print("\n" + "=" * 80)
    print("AGGREGATE TOTALS (What JavaScript sees):")
    print("=" * 80)

    grand_total = 0
    for section_type in ['courses', 'apps', 'books', 'audio', 'practice']:
        count = len(all_resources[section_type])
        print(f"{section_type}: {count}")
        grand_total += count

    print(f"\nGRAND TOTAL: {grand_total} resources")

    # Check for any duplicates or anomalies
    print("\n" + "=" * 80)
    print("CHECKING FOR ISSUES:")
    print("=" * 80)

    # Check if any resources appear to be duplicated
    for section_type, items in all_resources.items():
        seen = set()
        duplicates = []
        for item in items:
            key = f"{item['name']}||{item['url']}"
            if key in seen:
                duplicates.append(item)
            seen.add(key)

        if duplicates:
            print(f"\n⚠️  Found {len(duplicates)} duplicates in {section_type}:")
            for dup in duplicates[:5]:  # Show first 5
                print(f"  - {dup['name']} ({dup['language']})")

    # Compare with expected count
    print("\n" + "=" * 80)
    print("COMPARISON:")
    print("=" * 80)
    print(f"JavaScript is counting: 601 resources")
    print(f"Actual count found: {grand_total} resources")
    print(f"Expected after cleanup: 578 resources")
    print(f"Difference: {grand_total - 578} extra resources")

    if grand_total != 578:
        print("\n⚠️  The count doesn't match the expected 578!")
        print("This means either:")
        print("1. Some resources that should have been removed are still there")
        print("2. The removal script didn't complete successfully")
        print("3. There are duplicate resources being counted")

    # Export detailed list for analysis
    output_file = project_root / "scripts" / "resource_count_verification.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'total': grand_total,
            'by_type': {k: len(v) for k, v in all_resources.items()},
            'by_language': language_totals,
            'timestamp': '2025-09-25'
        }, f, indent=2)

    print(f"\n✅ Detailed report saved to: {output_file}")

    return grand_total

if __name__ == "__main__":
    total = main()