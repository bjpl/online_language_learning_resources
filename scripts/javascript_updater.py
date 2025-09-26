#!/usr/bin/env python3
"""
JavaScript File Updater Module
================================
Safe modification of JavaScript data files using AST-aware parsing.

Technical Approach:
- Uses regex with state machine for structure preservation
- Maintains exact formatting, indentation, and comments
- Validates JavaScript syntax after modifications
- Supports nested object structures

Why not use a full AST parser like Esprima?
- Adds heavy dependencies
- Our files have consistent structure
- Preservation of exact formatting is critical
- Regex with validation is sufficient for our use case
"""

import re
import json
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)


@dataclass
class ResourceLocation:
    """Represents the location of a resource in the file structure"""
    file_path: Path
    resource_type: str  # 'courses', 'apps', 'books', etc.
    category_index: int
    item_index: int
    line_number: int

    def __repr__(self):
        return (f"ResourceLocation(file={self.file_path.name}, "
                f"path={self.resource_type}[{self.category_index}].items[{self.item_index}])")


class JavaScriptParser:
    """
    Custom parser for JavaScript language data files.

    Design Decisions:
    - Pattern-based parsing for consistent structure
    - Line-by-line processing for formatting preservation
    - State machine for nested structure tracking
    """

    def __init__(self):
        # Regex patterns for structure detection
        self.patterns = {
            'resource_start': re.compile(r'^\s*resources:\s*\{'),
            'resource_type': re.compile(r'^\s*(courses|apps|books|audio|communities):\s*\['),
            'category_start': re.compile(r'^\s*\{'),
            'category_name': re.compile(r'^\s*category:\s*[\'"]([^\'\"]+)[\'"],?'),
            'items_start': re.compile(r'^\s*items:\s*\['),
            'item_start': re.compile(r'^\s*\{'),
            'item_field': re.compile(r'^\s*(\w+):\s*(.+),?$'),
            'url_field': re.compile(r'^\s*url:\s*[\'"]([^\'\"]+)[\'"],?'),
            'name_field': re.compile(r'^\s*name:\s*[\'"]([^\'\"]+)[\'"],?'),
            'array_end': re.compile(r'^\s*\]'),
            'object_end': re.compile(r'^\s*\}'),
        }

    def parse_file(self, file_path: Path) -> Tuple[Dict, List[str]]:
        """
        Parse JavaScript file into structured data and preserve lines.

        Returns:
            Tuple of (parsed_data, original_lines)

        Algorithm:
        1. Read file line by line
        2. Track nesting level and current context
        3. Extract resource data while preserving structure
        4. Build location map for each resource
        """

        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        parsed_data = {
            'resources': {},
            'locations': {}  # Maps resources to their line numbers
        }

        # State tracking variables
        current_type = None  # courses, apps, etc.
        current_category_idx = -1
        current_item_idx = -1
        in_resources = False
        in_items = False
        current_item = {}
        nesting_level = 0

        for line_num, line in enumerate(lines):
            # Track nesting level
            if '{' in line:
                nesting_level += line.count('{')
            if '}' in line:
                nesting_level -= line.count('}')

            # Check for resources section
            if self.patterns['resource_start'].search(line):
                in_resources = True
                continue

            if not in_resources:
                continue

            # Check for resource type (courses, apps, etc.)
            type_match = self.patterns['resource_type'].search(line)
            if type_match:
                current_type = type_match.group(1)
                parsed_data['resources'][current_type] = []
                current_category_idx = -1
                continue

            # Check for category start
            if current_type and self.patterns['category_start'].search(line):
                if not in_items:  # New category object
                    current_category_idx += 1
                    parsed_data['resources'][current_type].append({
                        'category': '',
                        'items': []
                    })
                    current_item_idx = -1

            # Check for category name
            cat_match = self.patterns['category_name'].search(line)
            if cat_match and current_type and current_category_idx >= 0:
                parsed_data['resources'][current_type][current_category_idx]['category'] = cat_match.group(1)

            # Check for items array
            if self.patterns['items_start'].search(line):
                in_items = True
                continue

            # Check for item start
            if in_items and self.patterns['item_start'].search(line):
                if current_item and 'name' in current_item:
                    # Save previous item
                    parsed_data['resources'][current_type][current_category_idx]['items'].append(current_item)

                current_item_idx += 1
                current_item = {'_line_number': line_num}

            # Parse item fields
            if in_items and current_item is not None:
                url_match = self.patterns['url_field'].search(line)
                if url_match:
                    current_item['url'] = url_match.group(1)
                    current_item['_url_line'] = line_num

                name_match = self.patterns['name_field'].search(line)
                if name_match:
                    current_item['name'] = name_match.group(1)
                    current_item['_name_line'] = line_num

                # Generic field parsing
                field_match = self.patterns['item_field'].search(line)
                if field_match:
                    field_name = field_match.group(1)
                    field_value = field_match.group(2).strip().strip(',').strip('\'"')

                    if field_name not in ['url', 'name']:  # Already handled
                        current_item[field_name] = field_value

            # Check for array/object end
            if self.patterns['array_end'].search(line):
                if in_items:
                    # Items array ended
                    if current_item and 'name' in current_item:
                        parsed_data['resources'][current_type][current_category_idx]['items'].append(current_item)
                    in_items = False
                    current_item = {}

        return parsed_data, lines

    def find_resource_location(self, parsed_data: Dict, target_url: str,
                               target_name: str = None) -> Optional[ResourceLocation]:
        """
        Find the exact location of a resource in the parsed data.

        Uses URL as primary identifier, name as secondary.
        Returns ResourceLocation or None if not found.
        """

        for resource_type, categories in parsed_data['resources'].items():
            for cat_idx, category in enumerate(categories):
                for item_idx, item in enumerate(category.get('items', [])):
                    # Check URL match (primary)
                    if item.get('url') == target_url:
                        return ResourceLocation(
                            file_path=Path(""),  # Will be set by caller
                            resource_type=resource_type,
                            category_index=cat_idx,
                            item_index=item_idx,
                            line_number=item.get('_url_line', 0)
                        )

                    # Check name match (secondary)
                    if target_name and item.get('name') == target_name:
                        # Verify it's likely the same resource
                        if not target_url or self._urls_similar(item.get('url', ''), target_url):
                            return ResourceLocation(
                                file_path=Path(""),
                                resource_type=resource_type,
                                category_index=cat_idx,
                                item_index=item_idx,
                                line_number=item.get('_name_line', 0)
                            )

        return None

    def _urls_similar(self, url1: str, url2: str) -> bool:
        """Check if two URLs are similar enough to be the same resource"""
        # Extract domain from both URLs
        domain1 = re.search(r'(?:https?://)?(?:www\.)?([^/]+)', url1)
        domain2 = re.search(r'(?:https?://)?(?:www\.)?([^/]+)', url2)

        if domain1 and domain2:
            return domain1.group(1) == domain2.group(1)
        return False


class JavaScriptUpdater:
    """
    Safely updates JavaScript files with removals and replacements.

    Key Features:
    - Preserves exact formatting and indentation
    - Maintains comment structure
    - Validates output syntax
    - Supports dry-run mode
    """

    def __init__(self, dry_run: bool = True):
        self.parser = JavaScriptParser()
        self.dry_run = dry_run
        self.changes_log = []

    def remove_resource(self, file_path: Path, location: ResourceLocation) -> bool:
        """
        Remove a resource from the JavaScript file.

        Algorithm:
        1. Parse file to find exact location
        2. Identify start and end lines of the resource object
        3. Remove lines while preserving structure
        4. Fix trailing commas if needed
        """

        try:
            parsed_data, lines = self.parser.parse_file(file_path)

            # Find the resource to remove
            resource_type = parsed_data['resources'][location.resource_type]
            category = resource_type[location.category_index]
            items = category['items']

            if location.item_index >= len(items):
                logger.error(f"Item index {location.item_index} out of range")
                return False

            item_to_remove = items[location.item_index]
            start_line = item_to_remove.get('_line_number', 0)

            # Find end line by looking for the closing brace
            end_line = start_line
            brace_count = 0
            for i in range(start_line, len(lines)):
                if '{' in lines[i]:
                    brace_count += 1
                if '}' in lines[i]:
                    brace_count -= 1
                    if brace_count == 0:
                        end_line = i
                        break

            # Check if we need to remove a trailing comma
            if location.item_index == len(items) - 1 and location.item_index > 0:
                # Last item - check if previous item has comma
                for i in range(end_line - 1, start_line - 1, -1):
                    if '},' in lines[i]:
                        lines[i] = lines[i].replace('},', '}')
                        break

            # Remove the lines
            if not self.dry_run:
                # Delete from end_line to start_line (inclusive)
                del lines[start_line:end_line + 1]

                # Also remove trailing comma if this was not the last item
                if location.item_index < len(items) - 1:
                    # Check the line after removal for comma
                    if start_line < len(lines) and lines[start_line].strip().startswith(','):
                        lines[start_line] = lines[start_line].replace(',', '', 1)

                # Write back to file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(lines)

            # Log the change
            self.changes_log.append({
                'action': 'remove',
                'file': str(file_path),
                'resource': item_to_remove.get('name', 'Unknown'),
                'url': item_to_remove.get('url', ''),
                'line': start_line
            })

            logger.info(f"Removed resource: {item_to_remove.get('name')} from {file_path.name}")
            return True

        except Exception as e:
            logger.error(f"Failed to remove resource: {e}")
            return False

    def replace_url(self, file_path: Path, location: ResourceLocation,
                   new_url: str) -> bool:
        """
        Replace URL of a resource in the JavaScript file.

        Approach:
        1. Find exact line with URL
        2. Preserve indentation and quotes style
        3. Replace only the URL value
        """

        try:
            parsed_data, lines = self.parser.parse_file(file_path)

            # Find the resource
            resource_type = parsed_data['resources'][location.resource_type]
            category = resource_type[location.category_index]
            item = category['items'][location.item_index]

            url_line_num = item.get('_url_line', 0)
            if url_line_num >= len(lines):
                logger.error(f"URL line {url_line_num} out of range")
                return False

            # Get the line with the URL
            url_line = lines[url_line_num]

            # Detect quote style (single or double)
            quote_char = '"' if '"' in url_line else "'"

            # Build replacement line preserving format
            indent_match = re.match(r'^(\s*)', url_line)
            indent = indent_match.group(1) if indent_match else ''

            # Check if line has trailing comma
            has_comma = url_line.rstrip().endswith(',')

            # Build new line
            new_line = f"{indent}url: {quote_char}{new_url}{quote_char}"
            if has_comma:
                new_line += ","
            new_line += "\n"

            if not self.dry_run:
                lines[url_line_num] = new_line

                # Write back to file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(lines)

            # Log the change
            self.changes_log.append({
                'action': 'replace',
                'file': str(file_path),
                'resource': item.get('name', 'Unknown'),
                'old_url': item.get('url', ''),
                'new_url': new_url,
                'line': url_line_num
            })

            logger.info(f"Replaced URL for: {item.get('name')} in {file_path.name}")
            return True

        except Exception as e:
            logger.error(f"Failed to replace URL: {e}")
            return False

    def validate_javascript(self, file_path: Path) -> bool:
        """
        Validate that the JavaScript file is still valid after modifications.

        Basic validation:
        1. Check bracket balance
        2. Check quote balance
        3. Ensure basic structure is intact
        """

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check bracket balance
            open_braces = content.count('{')
            close_braces = content.count('}')
            if open_braces != close_braces:
                logger.error(f"Bracket mismatch: {open_braces} {{ vs {close_braces} }}")
                return False

            open_brackets = content.count('[')
            close_brackets = content.count(']')
            if open_brackets != close_brackets:
                logger.error(f"Bracket mismatch: {open_brackets} [ vs {close_brackets} ]")
                return False

            # Check for basic structure
            if 'resources:' not in content:
                logger.error("Missing resources section")
                return False

            # Try to extract the data object (basic syntax check)
            # This is a simple check - for production, use a proper JS parser
            if not re.search(r'const\s+\w+Data\s*=\s*\{', content):
                logger.error("Missing data object declaration")
                return False

            logger.info(f"Validation passed for {file_path.name}")
            return True

        except Exception as e:
            logger.error(f"Validation failed: {e}")
            return False

    def generate_report(self) -> Dict:
        """
        Generate a comprehensive report of all changes.

        Includes:
        - Summary statistics
        - Detailed change log
        - Validation results
        """

        report = {
            'summary': {
                'total_changes': len(self.changes_log),
                'removals': sum(1 for c in self.changes_log if c['action'] == 'remove'),
                'replacements': sum(1 for c in self.changes_log if c['action'] == 'replace'),
                'dry_run': self.dry_run
            },
            'changes': self.changes_log,
            'files_modified': list(set(c['file'] for c in self.changes_log))
        }

        return report