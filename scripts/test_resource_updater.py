#!/usr/bin/env python3
"""
Test Suite for Resource Update System
======================================
Comprehensive tests ensuring correctness of the update pipeline.

Test Categories:
1. URL Normalization Tests
2. Fuzzy Matching Tests
3. JavaScript Parsing Tests
4. Conflict Resolution Tests
5. End-to-End Integration Tests

This demonstrates Test-Driven Development (TDD) principles
and various testing patterns.
"""

import unittest
import json
import tempfile
from pathlib import Path
from typing import Dict, List
import shutil

# Import modules to test
from resource_updater_core import (
    URLNormalizer, FuzzyMatcher, ResourceMatcher,
    BackupManager, ResourceMatch
)
from javascript_updater import JavaScriptParser, JavaScriptUpdater
from apply_resource_updates import (
    ConflictResolver, ResourceUpdateOrchestrator
)


class TestURLNormalizer(unittest.TestCase):
    """Test URL normalization functionality."""

    def setUp(self):
        self.normalizer = URLNormalizer()

    def test_basic_normalization(self):
        """Test basic URL normalization cases."""
        test_cases = [
            # (input, expected)
            ("https://www.example.com/", "https://example.com"),
            ("http://example.com/", "https://example.com"),
            ("https://example.com/path/", "https://example.com/path"),
            ("HTTPS://EXAMPLE.COM", "https://example.com"),
            ("www.example.com", "https://example.com"),
        ]

        for input_url, expected in test_cases:
            result = self.normalizer.normalize(input_url)
            self.assertEqual(result, expected,
                           f"Failed for {input_url}: got {result}, expected {expected}")

    def test_url_similarity(self):
        """Test URL similarity calculation."""
        test_cases = [
            # (url1, url2, min_similarity)
            ("https://example.com", "http://www.example.com", 95),
            ("https://example.com/path", "https://example.com/path/", 95),
            ("https://example.com", "https://different.com", 30),
        ]

        for url1, url2, min_sim in test_cases:
            similarity = self.normalizer.calculate_similarity(url1, url2)
            self.assertGreaterEqual(similarity, min_sim,
                                  f"{url1} vs {url2}: similarity {similarity} < {min_sim}")

    def test_edge_cases(self):
        """Test edge cases in URL normalization."""
        edge_cases = [
            "",  # Empty string
            "not-a-url",  # Invalid URL
            "//example.com",  # Protocol-relative
            "https://example.com?b=2&a=1",  # Query parameters
            "https://example.com#fragment",  # Fragment
        ]

        for url in edge_cases:
            # Should not raise exception
            result = self.normalizer.normalize(url)
            self.assertIsNotNone(result)


class TestFuzzyMatcher(unittest.TestCase):
    """Test fuzzy matching algorithms."""

    def setUp(self):
        self.matcher = FuzzyMatcher()

    def test_levenshtein_distance(self):
        """Test Levenshtein distance calculation."""
        test_cases = [
            ("hello", "hello", 0),
            ("hello", "hallo", 1),
            ("sunday", "saturday", 3),
            ("", "test", 4),
            ("test", "", 4),
        ]

        for s1, s2, expected in test_cases:
            result = self.matcher.levenshtein_distance(s1, s2)
            self.assertEqual(result, expected,
                           f"Distance between '{s1}' and '{s2}': got {result}, expected {expected}")

    def test_string_similarity(self):
        """Test string similarity percentage calculation."""
        test_cases = [
            ("Duolingo Hindi", "Duolingo Hindi", 100.0),
            ("Duolingo", "Dualingo", 87.5),  # 1 char diff in 8
            ("Learn Hindi", "Hindi Learn", 50.0),  # Different order
        ]

        for s1, s2, min_similarity in test_cases:
            result = self.matcher.calculate_string_similarity(s1, s2)
            self.assertGreaterEqual(result, min_similarity - 5,  # Allow 5% tolerance
                                  f"Similarity of '{s1}' and '{s2}': {result} < {min_similarity}")

    def test_token_similarity(self):
        """Test token-based similarity for titles."""
        test_cases = [
            ("Learn Hindi Online", "Online Hindi Learn", 100.0),  # Same tokens
            ("Duolingo Hindi Course", "Duolingo Hindi", 66.6),  # 2/3 tokens
            ("Completely Different Text", "Other Words Here", 0.0),  # No overlap
        ]

        for s1, s2, expected_sim in test_cases:
            result = self.matcher.token_similarity(s1, s2)
            self.assertAlmostEqual(result, expected_sim, delta=5,
                                 f"Token similarity failed for '{s1}' vs '{s2}'")


class TestJavaScriptParser(unittest.TestCase):
    """Test JavaScript file parsing."""

    def setUp(self):
        self.parser = JavaScriptParser()
        self.test_dir = Path(tempfile.mkdtemp())

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_parse_simple_structure(self):
        """Test parsing a simple JavaScript structure."""
        test_content = """
const testData = {
    name: 'Test',
    resources: {
        courses: [
            {
                category: 'Online Courses',
                items: [
                    {
                        name: 'Test Course',
                        url: 'https://example.com',
                        description: 'Test description',
                        free: true
                    }
                ]
            }
        ]
    }
};
"""
        test_file = self.test_dir / "test-data.js"
        test_file.write_text(test_content)

        parsed, lines = self.parser.parse_file(test_file)

        # Verify structure
        self.assertIn('resources', parsed)
        self.assertIn('courses', parsed['resources'])
        self.assertEqual(len(parsed['resources']['courses']), 1)
        self.assertEqual(parsed['resources']['courses'][0]['category'], 'Online Courses')
        self.assertEqual(len(parsed['resources']['courses'][0]['items']), 1)
        self.assertEqual(parsed['resources']['courses'][0]['items'][0]['name'], 'Test Course')

    def test_find_resource_location(self):
        """Test finding resource location in parsed data."""
        parsed_data = {
            'resources': {
                'courses': [
                    {
                        'category': 'Test',
                        'items': [
                            {
                                'name': 'Course 1',
                                'url': 'https://test1.com',
                                '_url_line': 10
                            },
                            {
                                'name': 'Course 2',
                                'url': 'https://test2.com',
                                '_url_line': 15
                            }
                        ]
                    }
                ]
            }
        }

        location = self.parser.find_resource_location(
            parsed_data, 'https://test2.com', 'Course 2'
        )

        self.assertIsNotNone(location)
        self.assertEqual(location.resource_type, 'courses')
        self.assertEqual(location.category_index, 0)
        self.assertEqual(location.item_index, 1)
        self.assertEqual(location.line_number, 15)


class TestConflictResolver(unittest.TestCase):
    """Test conflict resolution logic."""

    def setUp(self):
        self.resolver = ConflictResolver()

    def test_detect_conflicts(self):
        """Test conflict detection between removals and replacements."""
        removals = [
            {'url': 'https://example.com/1'},
            {'url': 'https://example.com/2'},
        ]
        replacements = [
            {'original_url': 'https://example.com/2', 'replacement_url': 'https://new.com'},
            {'original_url': 'https://example.com/3', 'replacement_url': 'https://new2.com'},
        ]

        conflicts = self.resolver.detect_conflicts(removals, replacements)

        self.assertEqual(len(conflicts), 1)
        self.assertEqual(conflicts[0]['url'], 'https://example.com/2')
        self.assertEqual(conflicts[0]['type'], 'removal_replacement_conflict')

    def test_resolve_conflicts_prefer_replacement(self):
        """Test conflict resolution with prefer_replacement strategy."""
        conflicts = [
            {
                'type': 'removal_replacement_conflict',
                'url': 'https://example.com',
                'removal': {'url': 'https://example.com'},
                'replacement': {'original_url': 'https://example.com',
                              'replacement_url': 'https://new.com'}
            }
        ]

        resolutions = self.resolver.resolve_conflicts(conflicts, 'prefer_replacement')

        self.assertEqual(len(resolutions['apply_replacements']), 1)
        self.assertEqual(len(resolutions['apply_removals']), 0)
        self.assertEqual(resolutions['apply_replacements'][0]['replacement_url'],
                        'https://new.com')


class TestBackupManager(unittest.TestCase):
    """Test backup and rollback functionality."""

    def setUp(self):
        self.test_dir = Path(tempfile.mkdtemp())
        self.backup_manager = BackupManager(self.test_dir / "backups")

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_create_backup(self):
        """Test backup creation."""
        # Create test files
        test_file1 = self.test_dir / "test1.js"
        test_file2 = self.test_dir / "test2.js"
        test_file1.write_text("content1")
        test_file2.write_text("content2")

        # Create backup
        backup_id = self.backup_manager.create_backup([test_file1, test_file2])

        self.assertIsNotNone(backup_id)
        backup_path = self.backup_manager.backup_dir / backup_id
        self.assertTrue(backup_path.exists())
        self.assertTrue((backup_path / "manifest.json").exists())
        self.assertTrue((backup_path / "test1.js").exists())
        self.assertTrue((backup_path / "test2.js").exists())

    def test_rollback(self):
        """Test rollback functionality."""
        # Create test file
        test_file = self.test_dir / "test.js"
        test_file.write_text("original content")

        # Create backup
        backup_id = self.backup_manager.create_backup([test_file])

        # Modify file
        test_file.write_text("modified content")
        self.assertEqual(test_file.read_text(), "modified content")

        # Rollback
        success = self.backup_manager.rollback(backup_id)

        self.assertTrue(success)
        self.assertEqual(test_file.read_text(), "original content")


class TestIntegration(unittest.TestCase):
    """End-to-end integration tests."""

    def setUp(self):
        self.test_dir = Path(tempfile.mkdtemp())
        self.project_root = self.test_dir
        (self.project_root / "assets" / "js").mkdir(parents=True)
        (self.project_root / "review_results").mkdir(parents=True)

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_dry_run_execution(self):
        """Test complete pipeline in dry-run mode."""
        # Create test data file
        js_content = """
const hindiData = {
    resources: {
        courses: [
            {
                category: 'Test Category',
                items: [
                    {
                        name: 'Test Course 1',
                        url: 'https://test1.com',
                        description: 'Test'
                    },
                    {
                        name: 'Test Course 2',
                        url: 'https://test2.com',
                        description: 'Test'
                    }
                ]
            }
        ]
    }
};
"""
        js_file = self.project_root / "assets" / "js" / "hindi-data.js"
        js_file.write_text(js_content)

        # Create removal directives
        removals = [
            {
                'language': 'hindi',
                'title': 'Test Course 1',
                'url': 'https://test1.com'
            }
        ]
        removals_file = self.project_root / "review_results" / "marked_review_removals.json"
        removals_file.write_text(json.dumps(removals))

        # Create empty files for other inputs
        (self.project_root / "review_results" / "link_review_deletions.json").write_text("[]")
        (self.project_root / "review_results" / "url_replacements.json").write_text("[]")

        # Run orchestrator in dry-run mode
        orchestrator = ResourceUpdateOrchestrator(self.project_root, dry_run=True)
        success = orchestrator.execute()

        self.assertTrue(success)
        self.assertEqual(orchestrator.stats.removals_matched, 1)
        self.assertEqual(orchestrator.stats.removals_applied, 0)  # Dry run

        # Verify original file unchanged
        self.assertEqual(js_file.read_text(), js_content)


def run_tests():
    """Run all tests with detailed output."""
    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    # Add test classes
    suite.addTests(loader.loadTestsFromTestCase(TestURLNormalizer))
    suite.addTests(loader.loadTestsFromTestCase(TestFuzzyMatcher))
    suite.addTests(loader.loadTestsFromTestCase(TestJavaScriptParser))
    suite.addTests(loader.loadTestsFromTestCase(TestConflictResolver))
    suite.addTests(loader.loadTestsFromTestCase(TestBackupManager))
    suite.addTests(loader.loadTestsFromTestCase(TestIntegration))

    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    return result.wasSuccessful()


if __name__ == "__main__":
    success = run_tests()
    exit(0 if success else 1)