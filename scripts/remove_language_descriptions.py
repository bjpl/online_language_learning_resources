#!/usr/bin/env python3
"""
Remove difficulty and description fields from all language data files
"""

import re
from pathlib import Path

def remove_fields_from_language_file(file_path):
    """Remove description and difficulty fields from a language data file"""
    print(f"Processing: {file_path.name}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes_made = []

    # Remove description field (multiline)
    # Pattern: description: "..." or description: '...'
    description_pattern = r',?\s*description:\s*["\'].*?["\'],?\s*\n'
    matches = re.findall(description_pattern, content, re.DOTALL)
    if matches:
        content = re.sub(description_pattern, '\n', content, flags=re.DOTALL)
        changes_made.append(f"Removed description field")

    # Remove difficulty field
    # Pattern: difficulty: "..." or difficulty: '...'
    difficulty_pattern = r',?\s*difficulty:\s*["\'].*?["\'],?\s*\n'
    matches = re.findall(difficulty_pattern, content)
    if matches:
        content = re.sub(difficulty_pattern, '\n', content)
        changes_made.append(f"Removed difficulty field")

    # Clean up any double commas that might result
    content = re.sub(r',\s*,', ',', content)

    # Clean up extra blank lines (more than 2 consecutive)
    content = re.sub(r'\n\n\n+', '\n\n', content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ {', '.join(changes_made)}")
        return True
    else:
        print(f"  - No changes needed")
        return False

def main():
    print("=" * 60)
    print("REMOVING LANGUAGE DESCRIPTIONS AND DIFFICULTY")
    print("=" * 60)
    print()

    # Find all language data files
    language_files = list(Path('assets/js').glob('*-data.js'))

    # Also check data-simple.js
    if Path('assets/js/data-simple.js').exists():
        language_files.append(Path('assets/js/data-simple.js'))

    print(f"Found {len(language_files)} language data files\n")

    modified_count = 0
    for file_path in sorted(language_files):
        if remove_fields_from_language_file(file_path):
            modified_count += 1

    print()
    print("=" * 60)
    print(f"✅ Complete! Modified {modified_count} files")
    print("=" * 60)

if __name__ == "__main__":
    main()