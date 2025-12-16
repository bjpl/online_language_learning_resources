#!/usr/bin/env python3
"""
Find the extra resources that are causing the count to be 601 instead of 578.
"""
import json
from pathlib import Path

def load_removal_data():
    """Load the removal data from our previous analysis."""
    review_dir = Path(r"C:\Users\brand\Development\Project_Workspace\active-development\online_language_learning_resources\review_results")

    # Load URLs that should have been removed
    removals_file = review_dir / "deduplicated" / "unique_removals.json"
    if removals_file.exists():
        with open(removals_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                # Old format - just a list of items
                return {'urls': [item.get('url', '') for item in data if 'url' in item],
                        'names': [item.get('name', '') for item in data if 'name' in item]}
            else:
                return data
    return {'urls': [], 'names': []}

def check_if_removed(js_content, url):
    """Check if a URL still exists in the JavaScript content."""
    # Normalize the URL for checking
    normalized_url = url.replace('https://', '').replace('http://', '').replace('www.', '').rstrip('/')

    # Check various forms
    if url in js_content:
        return False  # Not removed
    if normalized_url in js_content:
        return False  # Not removed

    return True  # Was removed

def main():
    """Find resources that should have been removed but weren't."""
    project_root = Path(r"C:\Users\brand\Development\Project_Workspace\active-development\online_language_learning_resources")
    js_dir = project_root / "assets" / "js"

    removal_data = load_removal_data()
    urls_to_remove = set(removal_data.get('urls', []))
    names_to_remove = set(removal_data.get('names', []))

    print(f"Loaded {len(urls_to_remove)} URLs and {len(names_to_remove)} names marked for removal")
    print("=" * 80)

    # Check each language file
    language_files = [
        'dutch-data.js', 'danish-data.js', 'portuguese-data.js',
        'italian-data.js', 'indonesian-data.js', 'korean-data.js',
        'hindi-data.js', 'swahili-data.js', 'japanese-data.js',
        'swedish-data.js', 'finnish-data.js', 'polish-data.js',
        'vietnamese-data.js'
    ]

    still_present = []

    for file_name in language_files:
        file_path = js_dir / file_name
        if file_path.exists():
            content = file_path.read_text(encoding='utf-8')
            language = file_name.replace('-data.js', '').title()

            # Check URLs
            for url in urls_to_remove:
                if not check_if_removed(content, url):
                    still_present.append({
                        'type': 'url',
                        'value': url,
                        'language': language,
                        'file': file_name
                    })

            # Check names
            for name in names_to_remove:
                if f'name: "{name}"' in content or f"name: '{name}'" in content:
                    still_present.append({
                        'type': 'name',
                        'value': name,
                        'language': language,
                        'file': file_name
                    })

    if still_present:
        print(f"\n⚠️  Found {len(still_present)} resources that should have been removed but are still present:")
        print("=" * 80)

        for item in still_present[:20]:  # Show first 20
            print(f"  {item['type']}: {item['value']}")
            print(f"    Found in: {item['file']}")
    else:
        print("\n✅ All marked resources have been successfully removed!")
        print("\nThe extra 23 resources (601 vs 578) might be:")
        print("1. Resources that were added after the review")
        print("2. Resources that weren't marked for removal but should be")
        print("3. A counting issue in the JavaScript code")

    # Let's also check the total based on the report
    report_file = project_root / "comprehensive_update_report_20250925_184150.json"
    if report_file.exists():
        with open(report_file, 'r', encoding='utf-8') as f:
            report = json.load(f)

        print("\n" + "=" * 80)
        print("FROM UPDATE REPORT:")
        print("=" * 80)
        print(f"Total resources before: {report['summary']['total_resources_before']}")
        print(f"Total resources after: {report['summary']['total_resources_after']}")
        print(f"Resources removed: {report['summary']['total_resources_removed']}")
        print(f"URLs replaced: {report['summary']['total_urls_replaced']}")

        if report['summary']['total_resources_after'] != 578:
            print(f"\n⚠️  Report shows {report['summary']['total_resources_after']} resources, not 578!")

if __name__ == "__main__":
    main()