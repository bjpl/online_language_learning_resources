#!/usr/bin/env python3
"""
Comprehensive comma fixer for JavaScript object literals
"""
import re

def fix_all_commas(file_path):
    """Fix all missing commas after property values"""
    print(f"Fixing {file_path}...")

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    fixed_lines = []
    changes = 0

    for i, line in enumerate(lines):
        original = line

        # Pattern 1: String value without comma followed by line with property
        # e.g., url: 'something'<newline>        free: true
        if re.search(r":\s*['\"][^'\"]*['\"]$", line.rstrip()):
            next_line = lines[i+1] if i+1 < len(lines) else ""
            # Check if next line has a property (starts with spaces + word + :)
            if re.match(r'^\s+[a-zA-Z_][a-zA-Z_0-9]*\s*:', next_line):
                line = line.rstrip() + ',\n'
                if line != original:
                    changes += 1

        # Pattern 2: Boolean/number value without comma
        # e.g., free: false<newline>        level: 'something'
        if re.search(r":\s*(true|false|\d+)$", line.rstrip()):
            next_line = lines[i+1] if i+1 < len(lines) else ""
            if re.match(r'^\s+[a-zA-Z_][a-zA-Z_0-9]*\s*:', next_line):
                line = line.rstrip() + ',\n'
                if line != original:
                    changes += 1

        fixed_lines.append(line)

    if changes > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(fixed_lines)
        print(f"  ✓ Fixed {changes} missing commas")
        return True
    else:
        print(f"  - No fixes needed")
        return False

def main():
    files = [
        'assets/js/hindi-data.js',
        'assets/js/swahili-data.js',
    ]

    total_fixed = 0
    for file_path in files:
        if fix_all_commas(file_path):
            total_fixed += 1

    print(f"\n✅ Fixed {total_fixed} files")

if __name__ == '__main__':
    main()