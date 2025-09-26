import json
from pathlib import Path

def extract_marked_review_removals(file_path):
    """Extract resources marked for deletion from marked-review-results file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    removals = []
    for key, item in data['results'].items():
        if item['action'] == 'delete':
            resource = item['resource']
            removal_entry = {
                'language': resource['language'],
                'title': resource['title'],
                'url': resource['url'],
                'category': resource.get('category', ''),
                'line_number': resource.get('lineNumber', '')
            }
            removals.append(removal_entry)

    return removals

def extract_marked_review_replacements(file_path):
    """Extract resources marked for replacement from marked-review-results file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    replacements = []
    for key, item in data['results'].items():
        if item['action'] == 'replace':
            resource = item['resource']
            replacement_entry = {
                'language': resource['language'],
                'title': resource['title'],
                'original_url': resource['url'],
                'replacement_url': item.get('replacementUrl', ''),
                'category': resource.get('category', ''),
                'line_number': resource.get('lineNumber', '')
            }
            replacements.append(replacement_entry)

    return replacements

def extract_link_review_deletions(file_path):
    """Extract resources marked for deletion from link-review-results file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    deletions = []
    if 'deleted' in data['results']:
        for item in data['results']['deleted']:
            deletion_entry = {
                'id': item.get('id', ''),
                'name': item.get('name', ''),
                'url': item.get('url', ''),
                'description': item.get('description', ''),
                'language': item.get('language', ''),
                'language_name': item.get('languageName', ''),
                'category': item.get('category', ''),
                'type': item.get('type', '')
            }
            deletions.append(deletion_entry)

    return deletions

def save_removals_list(removals, output_file, source_name):
    """Save removals to a clean formatted text file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"=== REMOVALS FROM {source_name} ===\n")
        f.write(f"Total: {len(removals)} resources marked for removal\n")
        f.write("=" * 60 + "\n\n")

        # Group by language
        by_language = {}
        for item in removals:
            lang = item.get('language', 'Unknown')
            if lang not in by_language:
                by_language[lang] = []
            by_language[lang].append(item)

        # Write grouped by language
        for language in sorted(by_language.keys()):
            f.write(f"\n## {language.upper()} ({len(by_language[language])} removals)\n")
            f.write("-" * 40 + "\n")

            for idx, item in enumerate(by_language[language], 1):
                f.write(f"\n{idx}. ")
                if 'title' in item:
                    f.write(f"{item.get('title', 'N/A')}\n")
                else:
                    f.write(f"{item.get('name', 'N/A')}\n")

                f.write(f"   URL: {item.get('url', item.get('original_url', 'N/A'))}\n")

                if item.get('category'):
                    f.write(f"   Category: {item['category']}\n")
                if item.get('line_number'):
                    f.write(f"   Line: {item['line_number']}\n")
                if item.get('description'):
                    f.write(f"   Description: {item['description']}\n")

def save_replacements_list(replacements, output_file):
    """Save replacements to a clean formatted text file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=== URL REPLACEMENTS ===\n")
        f.write(f"Total: {len(replacements)} resources need URL updates\n")
        f.write("=" * 60 + "\n\n")

        # Group by language
        by_language = {}
        for item in replacements:
            lang = item.get('language', 'Unknown')
            if lang not in by_language:
                by_language[lang] = []
            by_language[lang].append(item)

        # Write grouped by language
        for language in sorted(by_language.keys()):
            f.write(f"\n## {language.upper()} ({len(by_language[language])} replacements)\n")
            f.write("-" * 40 + "\n")

            for idx, item in enumerate(by_language[language], 1):
                f.write(f"\n{idx}. {item['title']}\n")
                f.write(f"   OLD URL: {item['original_url']}\n")
                f.write(f"   NEW URL: {item['replacement_url']}\n")
                if item.get('category'):
                    f.write(f"   Category: {item['category']}\n")
                if item.get('line_number'):
                    f.write(f"   Line: {item['line_number']}\n")

def main():
    # File paths
    marked_review_file = Path(r"C:\Users\brand\Downloads\marked-review-results-2025-09-23.json")
    link_review_file = Path(r"C:\Users\brand\Downloads\link-review-results-2025-09-23(2).json")

    # Output directory
    output_dir = Path(r"C:\Users\brand\Development\Project_Workspace\active-development\online_language_learning_resources\review_results")
    output_dir.mkdir(exist_ok=True)

    print("Processing review results...")
    print("=" * 60)

    # 1. Extract removals from marked-review-results
    print("\n1. Extracting removals from marked-review-results...")
    marked_removals = extract_marked_review_removals(marked_review_file)
    print(f"   Found {len(marked_removals)} resources marked for removal")

    # 2. Extract replacements from marked-review-results
    print("\n2. Extracting replacements from marked-review-results...")
    marked_replacements = extract_marked_review_replacements(marked_review_file)
    print(f"   Found {len(marked_replacements)} resources marked for replacement")

    # 3. Extract deletions from link-review-results
    print("\n3. Extracting removals from link-review-results...")
    link_deletions = extract_link_review_deletions(link_review_file)
    print(f"   Found {len(link_deletions)} resources marked for deletion")

    # Save results
    print("\n4. Saving results to files...")

    # Save marked review removals
    marked_removals_file = output_dir / "marked_review_removals.txt"
    save_removals_list(marked_removals, marked_removals_file, "MARKED-REVIEW-RESULTS")
    print(f"   ✓ Saved marked review removals to: {marked_removals_file}")

    # Save link review deletions
    link_deletions_file = output_dir / "link_review_deletions.txt"
    save_removals_list(link_deletions, link_deletions_file, "LINK-REVIEW-RESULTS")
    print(f"   ✓ Saved link review deletions to: {link_deletions_file}")

    # Save replacements
    replacements_file = output_dir / "url_replacements.txt"
    save_replacements_list(marked_replacements, replacements_file)
    print(f"   ✓ Saved URL replacements to: {replacements_file}")

    # Also save as JSON for programmatic use
    print("\n5. Saving JSON versions for programmatic use...")

    with open(output_dir / "marked_review_removals.json", 'w', encoding='utf-8') as f:
        json.dump(marked_removals, f, indent=2, ensure_ascii=False)

    with open(output_dir / "link_review_deletions.json", 'w', encoding='utf-8') as f:
        json.dump(link_deletions, f, indent=2, ensure_ascii=False)

    with open(output_dir / "url_replacements.json", 'w', encoding='utf-8') as f:
        json.dump(marked_replacements, f, indent=2, ensure_ascii=False)

    print("   ✓ JSON files saved")

    # Print summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total removals from marked-review-results: {len(marked_removals)}")
    print(f"Total replacements from marked-review-results: {len(marked_replacements)}")
    print(f"Total deletions from link-review-results: {len(link_deletions)}")
    print(f"\nAll results saved to: {output_dir}")

if __name__ == "__main__":
    main()