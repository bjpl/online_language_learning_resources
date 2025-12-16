#!/usr/bin/env python3
"""
Count actual resources in the language data files.
"""
import json
import re
from pathlib import Path
from typing import Dict, Set, Tuple

def extract_resources_from_js(js_content: str) -> Dict[str, Set[str]]:
    """Extract resources from JavaScript file content."""
    resources = {
        'courses': set(),
        'apps': set(),
        'books': set(),
        'audio': set(),
        'practice': set()
    }

    # More robust section detection
    # Find sections by looking for the patterns: section_name: [ or section_name: [{
    sections = {}

    # Find all sections with their content
    for section_name in ['courses', 'apps', 'books', 'audio', 'practice']:
        # Pattern to find the section and extract its content
        pattern = rf'{section_name}\s*:\s*\[(.*?)\](?:\s*[,}}])'
        matches = re.findall(pattern, js_content, re.DOTALL | re.IGNORECASE)

        if matches:
            for match in matches:
                # Extract all resources from this section
                # Find all items with name field
                item_pattern = r'\{\s*[^}]*?name:\s*["\']([^"\']+)["\'][^}]*?\}'
                items = re.findall(item_pattern, match, re.DOTALL)

                for item_name in items:
                    # Try to find the full item object to get URL
                    item_obj_pattern = rf'\{{\s*[^}}]*?name:\s*["\']{re.escape(item_name)}["\'][^}}]*?\}}'
                    item_match = re.search(item_obj_pattern, match, re.DOTALL)

                    if item_match:
                        item_content = item_match.group(0)
                        # Look for URL in the item
                        url_match = re.search(r'url:\s*["\']([^"\']+)["\']', item_content)
                        if url_match:
                            url = url_match.group(1)
                            resources[section_name].add(f"{item_name}||{url}")
                        else:
                            resources[section_name].add(f"{item_name}||NO_URL")
                    else:
                        resources[section_name].add(f"{item_name}||NO_URL")

    # Also handle nested structure with categories (courses, books, audio, practice often have this)
    category_pattern = r'{\s*category:\s*["\'][^"\']+["\'][^}]*?items:\s*\[(.*?)\]'
    category_matches = re.findall(category_pattern, js_content, re.DOTALL)

    for match in category_matches:
        # Find which section this belongs to by looking backwards
        # This is a bit complex, so let's use a different approach
        # Extract all items from category sections
        item_pattern = r'name:\s*["\']([^"\']+)["\']'
        items = re.findall(item_pattern, match)

        # Try to determine which section based on context
        # Look for the parent section
        for item_name in items:
            # Check if this item is already categorized
            found = False
            for section in resources:
                if any(item_name in res for res in resources[section]):
                    found = True
                    break

            if not found:
                # Try to find the full item object to get URL and section
                item_obj_pattern = rf'\{{\s*[^}}]*?name:\s*["\']{re.escape(item_name)}["\'][^}}]*?\}}'
                item_match = re.search(item_obj_pattern, js_content, re.DOTALL)

                if item_match:
                    item_content = item_match.group(0)
                    # Look for URL in the item
                    url_match = re.search(r'url:\s*["\']([^"\']+)["\']', item_content)
                    url = url_match.group(1) if url_match else "NO_URL"

                    # Find which section this belongs to by looking at context
                    # Get position of this item
                    item_pos = js_content.find(item_content)

                    # Look backward for section marker
                    before_item = js_content[:item_pos]

                    # Find the nearest section marker
                    for section in ['courses', 'apps', 'books', 'audio', 'practice']:
                        if f'{section}:' in before_item:
                            last_pos = before_item.rfind(f'{section}:')
                            # Check if there's no other section between this and the item
                            between = before_item[last_pos:]
                            other_sections = [s for s in ['courses', 'apps', 'books', 'audio', 'practice'] if s != section]
                            if not any(f'{s}:' in between for s in other_sections):
                                resources[section].add(f"{item_name}||{url}")
                                break

    return resources

def count_resources_in_file(file_path: Path) -> Tuple[Dict[str, int], int]:
    """Count resources in a single JavaScript file."""
    content = file_path.read_text(encoding='utf-8')
    resources = extract_resources_from_js(content)

    counts = {category: len(items) for category, items in resources.items()}
    total = sum(counts.values())

    return counts, total

def main():
    """Main function to count all resources."""
    # Project root
    project_root = Path(r"C:\Users\brand\Development\Project_Workspace\active-development\online_language_learning_resources")
    js_dir = project_root / "assets" / "js"

    # Language data files (excluding data-simple.js which is simplified)
    language_files = [
        'dutch-data.js', 'danish-data.js', 'portuguese-data.js',
        'italian-data.js', 'indonesian-data.js', 'korean-data.js',
        'hindi-data.js', 'swahili-data.js', 'japanese-data.js',
        'swedish-data.js', 'finnish-data.js', 'polish-data.js',
        'vietnamese-data.js'
    ]

    total_by_category = {
        'courses': 0,
        'apps': 0,
        'books': 0,
        'audio': 0,
        'practice': 0
    }

    total_by_language = {}
    grand_total = 0

    print("=" * 80)
    print("RESOURCE COUNT ANALYSIS")
    print("=" * 80)

    # Count resources in each file
    for file_name in language_files:
        file_path = js_dir / file_name
        if file_path.exists():
            language_name = file_name.replace('-data.js', '').title()
            counts, total = count_resources_in_file(file_path)

            total_by_language[language_name] = total
            grand_total += total

            # Add to category totals
            for category, count in counts.items():
                total_by_category[category] += count

            print(f"\n{language_name}:")
            print(f"  Total: {total}")
            for category, count in counts.items():
                if count > 0:
                    print(f"  - {category}: {count}")

    print("\n" + "=" * 80)
    print("CATEGORY TOTALS:")
    print("=" * 80)
    for category, count in total_by_category.items():
        print(f"{category.capitalize()}: {count}")

    print("\n" + "=" * 80)
    print(f"GRAND TOTAL: {grand_total} resources")
    print("=" * 80)

    # Check data-simple.js
    simple_file = js_dir / "data-simple.js"
    if simple_file.exists():
        print("\n" + "=" * 80)
        print("DATA-SIMPLE.JS ANALYSIS:")
        print("=" * 80)
        simple_counts, simple_total = count_resources_in_file(simple_file)
        print(f"Total in data-simple.js: {simple_total}")
        for category, count in simple_counts.items():
            if count > 0:
                print(f"  - {category}: {count}")
        print("\nNote: data-simple.js is a simplified version with fewer resources")

    return grand_total

if __name__ == "__main__":
    total = main()
    print(f"\n🎯 The website should show: {total} resources")