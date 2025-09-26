#!/usr/bin/env python3
"""
Count resources exactly like the JavaScript does.
This replicates the logic from resources-page.js aggregateResources function.
"""
import re
import json
from pathlib import Path
from collections import defaultdict

def count_like_javascript(file_path):
    """Count resources in a file exactly like the JavaScript does."""
    content = file_path.read_text(encoding='utf-8')
    counts = {
        'courses': 0,
        'apps': 0,
        'books': 0,
        'audio': 0,
        'practice': 0
    }

    # Find the resources section
    resources_match = re.search(r'resources\s*:\s*\{(.*?)\n\s*\}\s*(?:\n\s*\}|;)', content, re.DOTALL)
    if not resources_match:
        return counts, []

    resources_content = resources_match.group(1)
    all_resources = []

    # Process each resource type
    for resource_type in ['courses', 'apps', 'books', 'audio', 'practice']:
        # Find the section for this resource type
        pattern = rf'{resource_type}\s*:\s*\[(.*?)\]'
        match = re.search(pattern, resources_content, re.DOTALL)

        if match:
            section_content = match.group(1)

            # Check if it has categories with items
            if 'category:' in section_content and 'items:' in section_content:
                # Process each category
                category_pattern = r'\{\s*category:\s*["\']([^"\']+)["\'][^}]*?items:\s*\[(.*?)\]'
                for cat_match in re.finditer(category_pattern, section_content, re.DOTALL):
                    items_content = cat_match.group(2)

                    # Count items in this category
                    item_pattern = r'\{\s*name:\s*["\']([^"\']+)["\']'
                    items = re.findall(item_pattern, items_content)
                    counts[resource_type] += len(items)

                    for item_name in items:
                        all_resources.append({
                            'type': resource_type,
                            'name': item_name,
                            'file': file_path.name
                        })
            else:
                # Direct array of items (like apps)
                item_pattern = r'\{\s*name:\s*["\']([^"\']+)["\']'
                items = re.findall(item_pattern, section_content)
                counts[resource_type] += len(items)

                for item_name in items:
                    all_resources.append({
                        'type': resource_type,
                        'name': item_name,
                        'file': file_path.name
                    })

    return counts, all_resources

def main():
    """Main function."""
    project_root = Path(r"C:\Users\brand\Development\Project_Workspace\active-development\online_language_learning_resources")
    js_dir = project_root / "assets" / "js"

    language_files = [
        'dutch-data.js', 'danish-data.js', 'portuguese-data.js',
        'italian-data.js', 'indonesian-data.js', 'korean-data.js',
        'hindi-data.js', 'swahili-data.js', 'japanese-data.js',
        'swedish-data.js', 'finnish-data.js', 'polish-data.js',
        'vietnamese-data.js'
    ]

    total_counts = defaultdict(int)
    all_resources = []

    print("=" * 80)
    print("EXACT JAVASCRIPT COUNTING REPLICATION")
    print("=" * 80)

    for file_name in language_files:
        file_path = js_dir / file_name
        if file_path.exists():
            counts, resources = count_like_javascript(file_path)

            language = file_name.replace('-data.js', '').title()
            total = sum(counts.values())

            if total > 0:
                print(f"\n{language}: {total} resources")
                for resource_type, count in counts.items():
                    if count > 0:
                        print(f"  {resource_type}: {count}")
                        total_counts[resource_type] += count

            all_resources.extend(resources)

    print("\n" + "=" * 80)
    print("TOTALS (What JavaScript Sees):")
    print("=" * 80)

    grand_total = 0
    for resource_type in ['courses', 'apps', 'books', 'audio', 'practice']:
        count = total_counts[resource_type]
        print(f"{resource_type}: {count}")
        grand_total += count

    print(f"\nTOTAL: {grand_total} resources")

    print("\n" + "=" * 80)
    print("ANALYSIS:")
    print("=" * 80)
    print(f"JavaScript reports: 601 resources")
    print(f"This script found: {grand_total} resources")
    print(f"Target after cleanup: 578 resources")
    print(f"Extra resources: {grand_total - 578}")

    # Save detailed list
    output_file = project_root / "scripts" / "exact_count_details.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'total': grand_total,
            'by_type': dict(total_counts),
            'resources': all_resources[:100]  # First 100 for inspection
        }, f, indent=2)

    print(f"\nDetailed list saved to: {output_file}")

if __name__ == "__main__":
    main()