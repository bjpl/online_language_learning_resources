#!/usr/bin/env python3
"""
Fix missing commas in JavaScript data files after description/difficulty removal
"""

import re
from pathlib import Path

def fix_commas_in_file(file_path):
    """Add missing commas after property values"""
    print(f"Fixing: {file_path.name}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Pattern: property: value (no comma) followed by property on next line
    # Common patterns:
    # 1. url: "..." \n property:
    # 2. name: "..." \n property:
    # 3. code: "..." \n property:

    patterns = [
        # url without comma before next property
        (r'(url:\s*"[^"]+")(\s*\n\s+)([a-zA-Z_]+:)', r'\1,\2\3'),
        # name without comma before next property
        (r'(name:\s*"[^"]+")(\s*\n\s+)([a-zA-Z_]+:)', r'\1,\2\3'),
        # code without comma before next property
        (r'(code:\s*"[^"]+")(\s*\n\s+)([a-zA-Z_]+:)', r'\1,\2\3'),
        # description without comma (for resources)
        (r'(description:\s*"[^"]+")(\s*\n\s+)([a-zA-Z_]+:)', r'\1,\2\3'),
        # Any string property without comma
        (r'([a-zA-Z_]+:\s*"[^"]+")(\s*\n\s+)([a-zA-Z_]+:)', r'\1,\2\3'),
    ]

    for pattern, replacement in patterns:
        matches = re.findall(pattern, content)
        if matches:
            content = re.sub(pattern, replacement, content)
            changes.append(f"Fixed {len(matches)} missing commas")

    # Clean up any double commas
    content = re.sub(r',,+', ',', content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        if changes:
            print(f"  ✓ {', '.join(changes)}")
        return True
    else:
        print(f"  - No fixes needed")
        return False

def main():
    print("=" * 60)
    print("FIXING MISSING COMMAS")
    print("=" * 60)
    print()

    language_files = list(Path('assets/js').glob('*-data.js'))
    if Path('assets/js/data-simple.js').exists():
        language_files.append(Path('assets/js/data-simple.js'))

    fixed_count = 0
    for file_path in sorted(language_files):
        if fix_commas_in_file(file_path):
            fixed_count += 1

    print()
    print("=" * 60)
    print(f"✅ Complete! Fixed {fixed_count} files")
    print("=" * 60)

if __name__ == "__main__":
    main()