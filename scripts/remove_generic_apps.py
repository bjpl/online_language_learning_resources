#!/usr/bin/env python3
"""
Remove all generic app entries from language files.
Generic apps are those without language-specific names (e.g., "Duolingo" instead of "Duolingo Dutch").
"""
import re
import json
from pathlib import Path
from datetime import datetime

# List of generic app names that should be removed
GENERIC_APP_NAMES = [
    "Duolingo",
    "Memrise",
    "Busuu",
    "Babbel",
    "HelloTalk",
    "Tandem",
    "Anki",
    "Drops",
    "Mondly",
    "LingQ",
    "Clozemaster",
    "Lingodeer",
    "Mango Languages",
    "Rosetta Stone",
    "FluentU",
    "Speakly",
    "Google Translate",
    "Microsoft Translator",
    "DeepL",
    "Reverso",
    "Linguee",
    "WordReference",
    "Pimsleur",
    "Michel Thomas",
    "Assimil",
    "Teach Yourself",
    "Living Language",
    "Berlitz",
    "Fluenz",
    "Rocket Languages",
    "italki",
    "Preply",
    "Verbling",
    "Cambly",
    "Rype",
    "Lingoda",
    "FluentU",
    "Yabla",
    "SpanishDict",
    "Conjuguemos",
    "Language Transfer",
    "50Languages",
    "Learn Language",
    "FunEasyLearn",
    "Beelinguapp",
    "Readlang",
    "LingoPie",
    "News in Slow",
    "Coffee Break",
    "Language Pod 101"
]

def is_generic_app(app_name):
    """Check if an app name is generic (not language-specific)."""
    # Normalize for comparison
    app_name_lower = app_name.lower().strip()

    # Check if it's a generic name
    for generic in GENERIC_APP_NAMES:
        if app_name_lower == generic.lower():
            return True

    # Also check if it doesn't contain language indicators
    language_indicators = [
        'dutch', 'danish', 'portuguese', 'italian', 'indonesian',
        'korean', 'hindi', 'swahili', 'japanese', 'swedish',
        'finnish', 'polish', 'vietnamese', 'spanish', 'french',
        'german', 'chinese', 'arabic', 'russian', 'turkish',
        'norwegian', 'thai', 'greek', 'hebrew', 'czech'
    ]

    # If the name contains a language indicator, it's probably specific
    for lang in language_indicators:
        if lang in app_name_lower:
            return False

    # Additional patterns for generic apps
    generic_patterns = [
        r'^Learn .+$',  # "Learn X" without language
        r'^Study .+$',
        r'^Practice .+$',
        r'^Master .+$',
        r'^Speak .+$'
    ]

    for pattern in generic_patterns:
        if re.match(pattern, app_name, re.IGNORECASE):
            # But check if it has a language in it
            has_language = any(lang in app_name_lower for lang in language_indicators)
            if not has_language:
                return True

    return False

def remove_generic_apps_from_file(file_path):
    """Remove generic app entries from a JavaScript file."""
    content = file_path.read_text(encoding='utf-8')
    original_content = content

    removed_count = 0
    removed_apps = []

    # More comprehensive pattern to find apps sections
    # Handle both single-line and multi-line app entries
    apps_patterns = [
        r'(apps\s*:\s*\[)(.*?)(\])',  # Standard pattern
        r'(apps\s*:\s*\[)(.*?)(\n\s*\])',  # With newline before closing
    ]

    for apps_pattern in apps_patterns:
        apps_matches = list(re.finditer(apps_pattern, content, re.DOTALL))

        for apps_match in apps_matches:
            apps_content = apps_match.group(2)

            # Parse individual app entries - handle both quote styles
            app_patterns = [
                r'\{[^}]*?name:\s*"([^"]+)"[^}]*?\}',  # Double quotes
                r"\{[^}]*?name:\s*'([^']+)'[^}]*?\}",   # Single quotes
            ]

            all_apps = []
            for app_pattern in app_patterns:
                for match in re.finditer(app_pattern, apps_content, re.DOTALL):
                    all_apps.append((match.group(0), match.group(1), match.span()))

            # Process all found apps
            new_apps = []
            for app_entry, app_name, _ in all_apps:
                # Specifically check for exact "Duolingo" without language suffix
                is_generic = False

                # Check if it's exactly "Duolingo" (case-insensitive)
                if app_name.strip().lower() == "duolingo":
                    is_generic = True
                # Check other generic app names
                elif is_generic_app(app_name):
                    is_generic = True

                if is_generic:
                    removed_count += 1
                    removed_apps.append(app_name)
                    print(f"    ❌ Removing generic app: {app_name}")
                else:
                    new_apps.append(app_entry)

            if removed_count > 0:
                # Reconstruct apps section
                if new_apps:
                    # Preserve original formatting style
                    if '\n            {' in apps_content:
                        new_apps_content = ',\n            '.join(new_apps)
                        new_apps_section = f'{apps_match.group(1)}\n            {new_apps_content}\n        {apps_match.group(3)}'
                    else:
                        new_apps_content = ', '.join(new_apps)
                        new_apps_section = f'{apps_match.group(1)}{new_apps_content}{apps_match.group(3)}'
                else:
                    # No apps left
                    new_apps_section = f'{apps_match.group(1)}{apps_match.group(3)}'

                # Replace in content
                content = content[:apps_match.start()] + new_apps_section + content[apps_match.end():]
                break  # Only process the first match

    return content, removed_count, removed_apps

def main():
    """Main function."""
    project_root = Path(r"C:\Users\brand\Development\Project_Workspace\active-development\online_language_learning_resources")
    js_dir = project_root / "assets" / "js"

    language_files = [
        'dutch-data.js', 'danish-data.js', 'portuguese-data.js',
        'italian-data.js', 'indonesian-data.js', 'korean-data.js',
        'hindi-data.js', 'swahili-data.js', 'japanese-data.js',
        'swedish-data.js', 'finnish-data.js', 'polish-data.js',
        'vietnamese-data.js', 'data.js', 'data-simple.js'
    ]

    print("=" * 80)
    print("REMOVING GENERIC APP ENTRIES")
    print("=" * 80)
    print("\nGeneric apps are non-language-specific entries that duplicate")
    print("language-specific versions (e.g., 'Duolingo' vs 'Duolingo Dutch')")
    print()

    total_removed = 0
    all_removed_apps = []
    modified_files = []

    # Create backup
    backup_dir = project_root / "backups" / f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    backup_dir.mkdir(parents=True, exist_ok=True)

    for file_name in language_files:
        file_path = js_dir / file_name
        if file_path.exists():
            language = file_name.replace('-data.js', '').title()
            print(f"\n📁 Processing {language}...")

            # Backup file
            backup_path = backup_dir / file_name
            backup_path.write_text(file_path.read_text(encoding='utf-8'), encoding='utf-8')

            # Remove generic apps
            new_content, removed_count, removed_apps = remove_generic_apps_from_file(file_path)

            if removed_count > 0:
                # Save modified file
                file_path.write_text(new_content, encoding='utf-8')
                total_removed += removed_count
                all_removed_apps.extend(removed_apps)
                modified_files.append(file_name)
                print(f"    ✅ Removed {removed_count} generic apps")
            else:
                print(f"    ℹ️  No generic apps found")

    print("\n" + "=" * 80)
    print("SUMMARY:")
    print("=" * 80)
    print(f"Total generic apps removed: {total_removed}")
    print(f"Files modified: {len(modified_files)}")
    print(f"Backup created: {backup_dir}")

    if all_removed_apps:
        print("\nRemoved apps:")
        unique_apps = list(set(all_removed_apps))
        for app in sorted(unique_apps):
            count = all_removed_apps.count(app)
            print(f"  - {app} ({count} instances)")

    # Save report
    report = {
        'timestamp': datetime.now().isoformat(),
        'total_removed': total_removed,
        'modified_files': modified_files,
        'removed_apps': all_removed_apps,
        'unique_apps': sorted(list(set(all_removed_apps)))
    }

    report_file = project_root / "scripts" / "generic_apps_removal_report.json"
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    print(f"\n📄 Report saved to: {report_file}")

if __name__ == "__main__":
    main()