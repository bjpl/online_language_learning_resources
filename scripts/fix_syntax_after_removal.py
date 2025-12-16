#!/usr/bin/env python3
"""
Fix syntax errors after removing description and difficulty fields
Adds commas where needed
"""

import re
from pathlib import Path

def fix_syntax_in_file(file_path):
    """Fix missing commas and syntax issues"""
    print(f"Fixing: {file_path.name}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern: property: value\n followed immediately by property: value
    # This means we need a comma after the first one
    # Look for patterns like:   code: "it"\n    speakers:
    patterns_to_fix = [
        # code: "..." followed by next property
        (r'(code:\s*["\'][^"\']+["\'])\s*\n\s+([a-zA-Z_]+:)', r'\1,\n    \2'),
        # speakers: "..." followed by next property
        (r'(speakers:\s*["\'][^"\']+["\'])\s*\n\s+([a-zA-Z_]+:)', r'\1,\n    \2'),
        # learners: "..." followed by next property
        (r'(learners:\s*["\'][^"\']+["\'])\s*\n\s+([a-zA-Z_]+:)', r'\1,\n    \2'),
        # countries: [...] followed by next property
        (r'(countries:\s*\[[^\]]+\])\s*\n\s+([a-zA-Z_]+:)', r'\1,\n    \2'),
    ]

    for pattern, replacement in patterns_to_fix:
        content = re.sub(pattern, replacement, content)

    # Clean up any double commas
    content = re.sub(r',,+', ',', content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Fixed syntax")
        return True
    else:
        print(f"  - No fixes needed")
        return False

def main():
    print("=" * 60)
    print("FIXING SYNTAX AFTER FIELD REMOVAL")
    print("=" * 60)
    print()

    # Find all language data files
    language_files = list(Path('assets/js').glob('*-data.js'))

    # Also check data-simple.js
    if Path('assets/js/data-simple.js').exists():
        language_files.append(Path('assets/js/data-simple.js'))

    fixed_count = 0
    for file_path in sorted(language_files):
        if fix_syntax_in_file(file_path):
            fixed_count += 1

    print()
    print("=" * 60)
    print(f"✅ Complete! Fixed {fixed_count} files")
    print("=" * 60)

if __name__ == "__main__":
    main()