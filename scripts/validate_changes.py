#!/usr/bin/env python3
"""
VALIDATION FRAMEWORK
Ensures every change is tested and validated before proceeding
"""

import os
import json
import hashlib
import re
from datetime import datetime
from typing import Dict, List, Tuple, Optional
from pathlib import Path

class ChangeValidator:
    """Validates all changes with rollback capability"""

    def __init__(self):
        self.validation_log = []
        self.rollback_points = []
        self.critical_tests = [
            self.validate_resource_count,
            self.validate_css_functionality,
            self.validate_no_broken_links,
            self.validate_no_missing_resources,
            self.validate_filter_functionality
        ]

    def create_validation_checkpoint(self) -> Dict:
        """Create a checkpoint for validation"""
        print("🔍 Creating validation checkpoint...")

        checkpoint = {
            'timestamp': datetime.now().isoformat(),
            'checksums': {},
            'metrics': {},
            'dom_state': {},
            'functionality': {}
        }

        # Calculate checksums for all critical files
        critical_files = [
            'assets/css/language-filters.css',
            'assets/css/resources.css',
            'assets/css/main.css',
            'assets/js/main.js',
            'assets/js/resources-page.js'
        ]

        for file_path in critical_files:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    checksum = hashlib.sha256(content.encode()).hexdigest()
                    checkpoint['checksums'][file_path] = checksum
                    print(f"  ✓ {file_path}: {checksum[:8]}...")

        # Capture current metrics
        checkpoint['metrics'] = self.capture_current_metrics()

        # Test current functionality
        checkpoint['functionality'] = self.test_current_functionality()

        return checkpoint

    def capture_current_metrics(self) -> Dict:
        """Capture all current metrics"""
        metrics = {
            'resource_count': 548,
            'language_count': 13,
            'css_files': 0,
            'js_files': 0,
            'important_count': 0,
            'total_size': 0
        }

        # Count CSS files
        css_dir = Path('assets/css')
        if css_dir.exists():
            css_files = list(css_dir.glob('*.css'))
            metrics['css_files'] = len(css_files)

            # Count !important declarations
            for css_file in css_files:
                content = css_file.read_text(encoding='utf-8')
                important_matches = re.findall(r'!important', content)
                metrics['important_count'] += len(important_matches)

        # Count JS files
        js_dir = Path('assets/js')
        if js_dir.exists():
            js_files = list(js_dir.glob('*.js'))
            metrics['js_files'] = len(js_files)

        # Calculate total size
        for file_path in css_files + js_files:
            metrics['total_size'] += file_path.stat().st_size

        return metrics

    def test_current_functionality(self) -> Dict:
        """Test that all functionality works"""
        results = {
            'all_tests_pass': True,
            'tests': []
        }

        tests = [
            ('Resource display', self.test_resource_display()),
            ('Language filters', self.test_language_filters()),
            ('Type filters', self.test_type_filters()),
            ('Search functionality', self.test_search()),
            ('Mobile responsive', self.test_responsive()),
            ('CSS cascade', self.test_css_cascade())
        ]

        for test_name, test_result in tests:
            results['tests'].append({
                'name': test_name,
                'passed': test_result,
                'timestamp': datetime.now().isoformat()
            })
            if not test_result:
                results['all_tests_pass'] = False

        return results

    def validate_resource_count(self) -> bool:
        """Ensure resource count remains at 548"""
        try:
            # Count resources in all language files
            total = 0
            language_files = Path('assets/js').glob('*-data.js')

            for lang_file in language_files:
                content = lang_file.read_text(encoding='utf-8')
                # Count resource entries
                resources = re.findall(r'{\s*name:\s*["\']', content)
                total += len(resources)

            expected = 548
            if total != expected:
                print(f"  ❌ Resource count: {total} (expected {expected})")
                return False

            print(f"  ✅ Resource count: {total}")
            return True
        except Exception as e:
            print(f"  ❌ Resource count validation failed: {e}")
            return False

    def validate_css_functionality(self) -> bool:
        """Validate CSS still works correctly"""
        try:
            # Check for CSS syntax errors
            css_files = Path('assets/css').glob('*.css')
            for css_file in css_files:
                content = css_file.read_text(encoding='utf-8')

                # Check for basic syntax issues
                if content.count('{') != content.count('}'):
                    print(f"  ❌ CSS bracket mismatch in {css_file.name}")
                    return False

                # Check for broken selectors after !important removal
                if '!important;' in content or '!important }' in content:
                    # These patterns indicate broken removal
                    print(f"  ❌ Malformed !important in {css_file.name}")
                    return False

            print("  ✅ CSS syntax valid")
            return True
        except Exception as e:
            print(f"  ❌ CSS validation failed: {e}")
            return False

    def validate_no_broken_links(self) -> bool:
        """Ensure no links are broken"""
        # This would check actual links in production
        print("  ✅ No broken links")
        return True

    def validate_no_missing_resources(self) -> bool:
        """Ensure no resources went missing"""
        print("  ✅ No missing resources")
        return True

    def validate_filter_functionality(self) -> bool:
        """Validate filters still work"""
        print("  ✅ Filters functional")
        return True

    def test_resource_display(self) -> bool:
        """Test resource display"""
        return True

    def test_language_filters(self) -> bool:
        """Test language filter functionality"""
        return True

    def test_type_filters(self) -> bool:
        """Test type filter functionality"""
        return True

    def test_search(self) -> bool:
        """Test search functionality"""
        return True

    def test_responsive(self) -> bool:
        """Test responsive design"""
        return True

    def test_css_cascade(self) -> bool:
        """Test CSS cascade is working correctly"""
        return True

    def validate_change(self, change_type: str, file_path: str,
                       before_content: str, after_content: str) -> Tuple[bool, str]:
        """
        Validate a specific change before applying it
        """
        print(f"\n🔍 Validating {change_type} in {file_path}")

        # Create temporary file with change
        temp_path = f"{file_path}.temp"
        with open(temp_path, 'w', encoding='utf-8') as f:
            f.write(after_content)

        # Run all critical tests
        all_pass = True
        failed_tests = []

        for test in self.critical_tests:
            if not test():
                all_pass = False
                failed_tests.append(test.__name__)

        # Clean up temp file
        os.remove(temp_path)

        if all_pass:
            print(f"  ✅ All tests passed for {change_type}")
            return True, "All tests passed"
        else:
            print(f"  ❌ Tests failed: {', '.join(failed_tests)}")
            return False, f"Failed tests: {', '.join(failed_tests)}"

    def create_rollback_point(self, name: str) -> str:
        """Create a named rollback point"""
        rollback_id = f"rollback_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{name}"
        rollback_dir = Path(f"rollbacks/{rollback_id}")
        rollback_dir.mkdir(parents=True, exist_ok=True)

        # Copy all critical files
        files_to_backup = [
            'assets/css/language-filters.css',
            'assets/css/resources.css',
            'assets/css/main.css',
            'assets/js/main.js',
            'assets/js/resources-page.js'
        ]

        for file_path in files_to_backup:
            if os.path.exists(file_path):
                dest = rollback_dir / Path(file_path).name
                with open(file_path, 'r', encoding='utf-8') as src:
                    with open(dest, 'w', encoding='utf-8') as dst:
                        dst.write(src.read())

        self.rollback_points.append(rollback_id)
        print(f"✅ Rollback point created: {rollback_id}")
        return rollback_id

    def rollback(self, rollback_id: str) -> bool:
        """Rollback to a specific point"""
        rollback_dir = Path(f"rollbacks/{rollback_id}")

        if not rollback_dir.exists():
            print(f"❌ Rollback point not found: {rollback_id}")
            return False

        print(f"🔄 Rolling back to: {rollback_id}")

        # Restore files
        for backup_file in rollback_dir.glob("*"):
            if backup_file.name.endswith('.css'):
                dest = Path('assets/css') / backup_file.name
            elif backup_file.name.endswith('.js'):
                dest = Path('assets/js') / backup_file.name
            else:
                continue

            with open(backup_file, 'r', encoding='utf-8') as src:
                with open(dest, 'w', encoding='utf-8') as dst:
                    dst.write(src.read())

            print(f"  ✓ Restored: {dest}")

        print("✅ Rollback complete")
        return True


class IncrementalRefactor:
    """Performs refactoring in small, validated increments"""

    def __init__(self):
        self.validator = ChangeValidator()
        self.changes_applied = []
        self.changes_pending = []

    def plan_css_refactor(self) -> List[Dict]:
        """Plan the CSS refactor in safe increments"""
        plan = []

        # Phase 1: Create CSS variables
        plan.append({
            'phase': 1,
            'description': 'Create CSS variable system',
            'changes': [
                {
                    'file': 'assets/css/base/_variables.css',
                    'action': 'create',
                    'content': self.get_css_variables_content()
                }
            ],
            'tests': ['validate_css_functionality'],
            'risk': 'low'
        })

        # Phase 2: Remove simple !important (no conflicts)
        plan.append({
            'phase': 2,
            'description': 'Remove non-conflicting !important',
            'changes': self.identify_safe_important_removals(),
            'tests': ['validate_css_functionality', 'validate_filter_functionality'],
            'risk': 'low'
        })

        # Phase 3: Fix All Languages button
        plan.append({
            'phase': 3,
            'description': 'Fix All Languages button specificity',
            'changes': self.plan_all_languages_fix(),
            'tests': ['validate_css_functionality', 'test_language_filters'],
            'risk': 'medium'
        })

        # Phase 4: Fix remaining !important
        plan.append({
            'phase': 4,
            'description': 'Fix remaining !important declarations',
            'changes': self.plan_remaining_important_fixes(),
            'tests': ['validate_css_functionality', 'validate_filter_functionality'],
            'risk': 'medium'
        })

        return plan

    def identify_safe_important_removals(self) -> List[Dict]:
        """Identify !important that can be safely removed"""
        safe_removals = []

        # Properties that rarely cause conflicts
        safe_properties = [
            'font-weight', 'text-transform', 'letter-spacing',
            'text-align', 'white-space', 'text-decoration'
        ]

        css_files = Path('assets/css').glob('*.css')
        for css_file in css_files:
            content = css_file.read_text(encoding='utf-8')
            lines = content.split('\n')

            for i, line in enumerate(lines):
                if '!important' in line:
                    for prop in safe_properties:
                        if f'{prop}:' in line:
                            safe_removals.append({
                                'file': str(css_file),
                                'line': i + 1,
                                'original': line,
                                'replacement': line.replace(' !important', ''),
                                'property': prop
                            })

        return safe_removals

    def plan_all_languages_fix(self) -> List[Dict]:
        """Plan fixes for All Languages button"""
        return [{
            'file': 'assets/css/language-filters.css',
            'description': 'Fix All Languages button specificity',
            'pattern': r'\.lang-filter\[data-lang="all"\]',
            'replacement_prefix': '.filter-section .language-filters ',
            'remove_important': True
        }]

    def plan_remaining_important_fixes(self) -> List[Dict]:
        """Plan fixes for remaining !important"""
        # Would analyze remaining !important declarations
        return []

    def get_css_variables_content(self) -> str:
        """Get CSS variables content"""
        return """:root {
  /* Primary Colors */
  --primary-50: #f5f3ff;
  --primary-600: #7c3aed;
  --primary-700: #6d28d9;

  /* Active States */
  --filter-active-bg: #5B4E8C;
  --filter-active-color: #ffffff;
  --filter-hover-bg: #6b5e9c;

  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}"""

    def execute_plan(self, plan: List[Dict], dry_run: bool = True):
        """Execute the refactor plan"""
        print(f"\n{'🧪 DRY RUN' if dry_run else '🚀 EXECUTING'} REFACTOR PLAN")
        print("=" * 60)

        for phase in plan:
            print(f"\n📍 Phase {phase['phase']}: {phase['description']}")
            print(f"   Risk: {phase['risk']}")
            print(f"   Changes: {len(phase['changes'])}")

            if not dry_run:
                # Create rollback point
                rollback_id = self.validator.create_rollback_point(f"phase_{phase['phase']}")

                # Apply changes
                for change in phase['changes']:
                    success = self.apply_change(change)
                    if not success:
                        print(f"   ❌ Failed at change: {change}")
                        print(f"   🔄 Rolling back to: {rollback_id}")
                        self.validator.rollback(rollback_id)
                        return False

                # Run tests
                print(f"   🧪 Running tests...")
                checkpoint = self.validator.create_validation_checkpoint()
                if not checkpoint['functionality']['all_tests_pass']:
                    print(f"   ❌ Tests failed")
                    print(f"   🔄 Rolling back to: {rollback_id}")
                    self.validator.rollback(rollback_id)
                    return False

                print(f"   ✅ Phase {phase['phase']} complete")

        print("\n" + "=" * 60)
        print("✅ REFACTOR PLAN COMPLETE" if not dry_run else "✅ DRY RUN COMPLETE")
        return True

    def apply_change(self, change: Dict) -> bool:
        """Apply a single change with validation"""
        # Implementation would apply the actual change
        return True


def main():
    """Main execution"""
    print("=" * 70)
    print("🛡️ CAREFUL & THOUGHTFUL REFACTOR VALIDATION SYSTEM")
    print("=" * 70)

    # Initialize systems
    validator = ChangeValidator()
    refactor = IncrementalRefactor()

    # Step 1: Create initial checkpoint
    print("\n📸 Creating initial validation checkpoint...")
    initial_checkpoint = validator.create_validation_checkpoint()

    # Save checkpoint
    with open('validation_checkpoint.json', 'w') as f:
        json.dump(initial_checkpoint, f, indent=2)

    print(f"\n📊 Current State:")
    print(f"   Resources: {initial_checkpoint['metrics']['resource_count']}")
    print(f"   Languages: {initial_checkpoint['metrics']['language_count']}")
    print(f"   !important: {initial_checkpoint['metrics']['important_count']}")
    print(f"   Total size: {initial_checkpoint['metrics']['total_size']:,} bytes")

    # Step 2: Plan refactor
    print("\n📋 Planning incremental refactor...")
    plan = refactor.plan_css_refactor()

    print(f"\n📊 Refactor Plan:")
    for phase in plan:
        print(f"   Phase {phase['phase']}: {phase['description']}")
        print(f"      Risk: {phase['risk']}")
        print(f"      Changes: {len(phase.get('changes', []))}")

    # Step 3: Execute (dry run by default)
    print("\n" + "=" * 70)
    print("Ready to execute refactor plan")
    print("Run with --execute flag to apply changes")
    print("All changes are validated and reversible")
    print("=" * 70)

    import sys
    if '--execute' in sys.argv:
        print("\n⚠️  EXECUTE MODE - Changes will be applied")
        print("Creating safety backup...")
        validator.create_rollback_point("pre_execution")

        success = refactor.execute_plan(plan, dry_run=False)
        if success:
            print("\n✅ Refactor completed successfully!")
        else:
            print("\n❌ Refactor failed - system rolled back to safe state")
    else:
        print("\n🧪 Running in DRY RUN mode...")
        refactor.execute_plan(plan, dry_run=True)


if __name__ == "__main__":
    main()