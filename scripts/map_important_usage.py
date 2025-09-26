#!/usr/bin/env python3
"""
MAP ALL !IMPORTANT USAGE
Creates a comprehensive map of all !important declarations and their dependencies
This helps us understand what can be safely changed
"""

import re
import json
from pathlib import Path
from typing import Dict, List, Set
from collections import defaultdict

class ImportantMapper:
    """Maps all !important usage and dependencies"""

    def __init__(self):
        self.important_map = defaultdict(list)
        self.selector_conflicts = defaultdict(list)
        self.safe_to_remove = []
        self.requires_careful_handling = []
        self.critical_dependencies = []

    def analyze_all_css(self) -> Dict:
        """Analyze all CSS files for !important usage"""
        print("🔍 Mapping all !important declarations...\n")

        css_files = [
            'assets/css/language-filters.css',
            'assets/css/resources.css',
            'assets/css/language.css',
            'assets/css/main.css',
            'assets/css/modern-ui.css',
            'assets/css/modern-ui-clean.css'
        ]

        total_important = 0
        all_selectors = defaultdict(list)

        for file_path in css_files:
            print(f"📄 Analyzing: {file_path}")
            file_important = self.analyze_file(file_path, all_selectors)
            total_important += file_important
            print(f"   Found {file_important} !important declarations\n")

        # Find selector conflicts
        self.find_selector_conflicts(all_selectors)

        # Categorize !important declarations
        self.categorize_important_declarations()

        # Generate report
        report = self.generate_report(total_important)

        return report

    def analyze_file(self, file_path: str, all_selectors: Dict) -> int:
        """Analyze a single CSS file"""
        if not Path(file_path).exists():
            return 0

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.split('\n')
        important_count = 0
        current_selector = None
        current_rule_start = 0

        for i, line in enumerate(lines):
            # Detect selector
            if '{' in line and not '/*' in line:
                selector_match = re.match(r'^([^{]+)\s*{', line)
                if selector_match:
                    current_selector = selector_match.group(1).strip()
                    current_rule_start = i
                    all_selectors[current_selector].append({
                        'file': file_path,
                        'line': i + 1
                    })

            # Find !important
            if '!important' in line:
                important_count += 1

                # Extract property and value
                prop_match = re.match(r'\s*([^:]+):\s*([^;]+)\s*!important', line)
                if prop_match:
                    property_name = prop_match.group(1).strip()
                    value = prop_match.group(2).strip()

                    declaration = {
                        'file': file_path,
                        'line': i + 1,
                        'selector': current_selector or 'unknown',
                        'property': property_name,
                        'value': value,
                        'full_line': line.strip(),
                        'context': self.get_context(lines, i)
                    }

                    self.important_map[file_path].append(declaration)

            # Reset selector on closing brace
            if '}' in line and not '/*' in line:
                current_selector = None

        return important_count

    def get_context(self, lines: List[str], line_num: int) -> str:
        """Get context around a line"""
        start = max(0, line_num - 2)
        end = min(len(lines), line_num + 3)
        return '\n'.join(lines[start:end])

    def find_selector_conflicts(self, all_selectors: Dict):
        """Find selectors that appear in multiple files"""
        for selector, locations in all_selectors.items():
            if len(locations) > 1:
                self.selector_conflicts[selector] = locations

    def categorize_important_declarations(self):
        """Categorize !important declarations by safety to remove"""

        # Properties that are generally safe to remove !important from
        safe_properties = {
            'font-weight', 'font-size', 'text-transform', 'letter-spacing',
            'text-align', 'text-decoration', 'white-space', 'line-height',
            'font-family', 'text-indent', 'word-spacing'
        }

        # Properties that need careful handling
        careful_properties = {
            'background', 'background-color', 'color', 'border',
            'border-color', 'display', 'position', 'z-index'
        }

        # Critical selectors (All Languages button, active states)
        critical_selectors = [
            'lang-filter[data-lang="all"]',
            '.active',
            ':hover'
        ]

        for file_path, declarations in self.important_map.items():
            for decl in declarations:
                selector = decl['selector']
                prop = decl['property']

                # Check if it's a critical selector
                is_critical = any(crit in selector for crit in critical_selectors)

                if is_critical:
                    self.critical_dependencies.append(decl)
                elif prop in safe_properties:
                    self.safe_to_remove.append(decl)
                elif prop in careful_properties:
                    self.requires_careful_handling.append(decl)
                else:
                    # Default to careful handling
                    self.requires_careful_handling.append(decl)

    def generate_report(self, total_important: int) -> Dict:
        """Generate comprehensive report"""
        report = {
            'summary': {
                'total_important': total_important,
                'safe_to_remove': len(self.safe_to_remove),
                'requires_careful': len(self.requires_careful_handling),
                'critical': len(self.critical_dependencies),
                'selector_conflicts': len(self.selector_conflicts)
            },
            'by_file': {},
            'safe_removals': [],
            'careful_handling': [],
            'critical_items': [],
            'conflicts': {}
        }

        # Organize by file
        for file_path, declarations in self.important_map.items():
            report['by_file'][file_path] = {
                'count': len(declarations),
                'declarations': declarations
            }

        # Add categorized lists
        report['safe_removals'] = self.safe_to_remove
        report['careful_handling'] = self.requires_careful_handling
        report['critical_items'] = self.critical_dependencies
        report['conflicts'] = dict(self.selector_conflicts)

        return report

    def generate_action_plan(self, report: Dict) -> List[Dict]:
        """Generate an action plan based on the analysis"""
        plan = []

        # Phase 1: Remove safe !important declarations
        if report['safe_removals']:
            plan.append({
                'phase': 1,
                'title': 'Remove Safe !important Declarations',
                'description': 'Remove !important from properties that rarely cause conflicts',
                'count': len(report['safe_removals']),
                'risk': 'LOW',
                'changes': [
                    {
                        'file': item['file'],
                        'line': item['line'],
                        'selector': item['selector'],
                        'property': item['property'],
                        'action': 'remove_important'
                    }
                    for item in report['safe_removals'][:10]  # First 10 as example
                ]
            })

        # Phase 2: Fix All Languages button
        all_languages_items = [
            item for item in report['critical_items']
            if 'data-lang="all"' in item['selector']
        ]
        if all_languages_items:
            plan.append({
                'phase': 2,
                'title': 'Fix All Languages Button Specificity',
                'description': 'Use proper CSS specificity instead of !important',
                'count': len(all_languages_items),
                'risk': 'MEDIUM',
                'strategy': 'Increase specificity with parent selectors',
                'changes': [
                    {
                        'file': item['file'],
                        'line': item['line'],
                        'selector': item['selector'],
                        'property': item['property'],
                        'action': 'increase_specificity',
                        'new_selector': f'.filter-section .language-filters {item["selector"]}'
                    }
                    for item in all_languages_items[:5]  # First 5 as example
                ]
            })

        # Phase 3: Handle remaining careful items
        if report['careful_handling']:
            plan.append({
                'phase': 3,
                'title': 'Handle Remaining !important with Care',
                'description': 'Carefully refactor remaining !important declarations',
                'count': len(report['careful_handling']),
                'risk': 'MEDIUM-HIGH',
                'strategy': 'Use CSS custom properties and scoped selectors',
                'requires_testing': True
            })

        return plan


def main():
    """Main execution"""
    print("=" * 70)
    print("🗺️  !IMPORTANT DEPENDENCY MAPPER")
    print("=" * 70)
    print()

    mapper = ImportantMapper()

    # Analyze all CSS
    report = mapper.analyze_all_css()

    # Print summary
    print("\n" + "=" * 70)
    print("📊 ANALYSIS SUMMARY")
    print("=" * 70)
    print(f"\n🔢 Total !important declarations: {report['summary']['total_important']}")
    print(f"   ✅ Safe to remove: {report['summary']['safe_to_remove']}")
    print(f"   ⚠️  Requires careful handling: {report['summary']['requires_careful']}")
    print(f"   🔴 Critical dependencies: {report['summary']['critical']}")
    print(f"   ⚡ Selector conflicts: {report['summary']['selector_conflicts']}")

    # Print by file
    print("\n📁 BY FILE:")
    for file_path, data in report['by_file'].items():
        print(f"   {Path(file_path).name}: {data['count']} declarations")

    # Print safe removals
    if report['safe_removals']:
        print(f"\n✅ SAFE TO REMOVE ({len(report['safe_removals'])} total):")
        for item in report['safe_removals'][:5]:  # Show first 5
            print(f"   {Path(item['file']).name}:{item['line']} - {item['property']} in {item['selector']}")
        if len(report['safe_removals']) > 5:
            print(f"   ... and {len(report['safe_removals']) - 5} more")

    # Print critical items
    if report['critical_items']:
        print(f"\n🔴 CRITICAL ITEMS ({len(report['critical_items'])} total):")

        # Group by selector pattern
        all_languages = [i for i in report['critical_items'] if 'all' in i['selector']]
        active_states = [i for i in report['critical_items'] if 'active' in i['selector']]
        hover_states = [i for i in report['critical_items'] if 'hover' in i['selector']]

        if all_languages:
            print(f"   All Languages button: {len(all_languages)} declarations")
        if active_states:
            print(f"   Active states: {len(active_states)} declarations")
        if hover_states:
            print(f"   Hover states: {len(hover_states)} declarations")

    # Generate action plan
    print("\n" + "=" * 70)
    print("🎯 ACTION PLAN")
    print("=" * 70)

    action_plan = mapper.generate_action_plan(report)

    for phase in action_plan:
        print(f"\n📍 Phase {phase['phase']}: {phase['title']}")
        print(f"   Risk: {phase['risk']}")
        print(f"   Items: {phase['count']}")
        print(f"   {phase['description']}")

        if 'strategy' in phase:
            print(f"   Strategy: {phase['strategy']}")

        if 'changes' in phase and phase['changes']:
            print(f"   Example changes:")
            for change in phase['changes'][:3]:  # Show first 3
                print(f"      - {Path(change['file']).name}:{change['line']} ({change['action']})")

    # Save detailed report
    with open('important_map.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    print("\n" + "=" * 70)
    print("✅ Analysis complete! Detailed report saved to important_map.json")
    print("\n📋 Next steps:")
    print("1. Review important_map.json for detailed analysis")
    print("2. Start with Phase 1 (safe removals)")
    print("3. Test after each phase")
    print("4. Use rollback points between phases")
    print("=" * 70)


if __name__ == "__main__":
    main()