#!/bin/bash

# ========================================
# Run All Test Scripts
# ========================================
#
# This script runs all data loading tests in sequence
# and generates a comprehensive report.

echo "========================================"
echo "Language Learning Hub - Test Suite"
echo "========================================"
echo ""
echo "Running comprehensive data loading tests..."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
TESTS_PASSED=0
TESTS_FAILED=0

# Test 1: Empty languageData
echo -e "${YELLOW}[1/5]${NC} Running: Empty languageData validation..."
if node scripts/test-empty-language-data.js > /tmp/test1.log 2>&1; then
    echo -e "${GREEN}✅ PASS${NC} - Empty languageData test"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - Empty languageData test"
    cat /tmp/test1.log
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 2: Lazy loading functionality
echo -e "${YELLOW}[2/5]${NC} Running: Lazy loading functionality..."
if node scripts/test-lazy-loading.js > /tmp/test2.log 2>&1; then
    echo -e "${GREEN}✅ PASS${NC} - Lazy loading test"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - Lazy loading test"
    cat /tmp/test2.log
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 3: Performance analysis
echo -e "${YELLOW}[3/5]${NC} Running: Performance analysis..."
if node scripts/test-performance.js > /tmp/test3.log 2>&1; then
    echo -e "${GREEN}✅ PASS${NC} - Performance test"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - Performance test"
    cat /tmp/test3.log
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 4: Resource counter validation
echo -e "${YELLOW}[4/5]${NC} Running: Resource counter validation..."
if node scripts/test-resource-counter-validation.js > /tmp/test4.log 2>&1; then
    echo -e "${GREEN}✅ PASS${NC} - Resource counter test"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - Resource counter test"
    cat /tmp/test4.log
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Test 5: Generate POC fix
echo -e "${YELLOW}[5/5]${NC} Running: Proof-of-concept fix generator..."
if node scripts/poc-fix-resource-counter.js > /tmp/test5.log 2>&1; then
    echo -e "${GREEN}✅ PASS${NC} - POC fix generated"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAIL${NC} - POC fix generation"
    cat /tmp/test5.log
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo ""

# Summary
echo "========================================"
echo "Test Suite Summary"
echo "========================================"
echo -e "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"
echo -e "${GREEN}Passed: ${TESTS_PASSED}${NC}"
echo -e "${RED}Failed: ${TESTS_FAILED}${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ ALL TESTS PASSED${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review generated files:"
    echo "   - assets/js/resource-counts.js"
    echo "   - scripts/test-report.json"
    echo "2. Run: node scripts/generate-test-report.js"
    echo "3. Review: docs/TEST_REPORT.md"
    echo "4. Implement the recommended solution"
    exit 0
else
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    echo ""
    echo "Check log files in /tmp/test*.log for details"
    exit 1
fi
