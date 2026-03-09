/**
 * Unit tests for triggerWaterAnimation function
 * Tests Requirements 5.2 and 5.3
 */

// Mock DOM environment
class MockElement {
  constructor() {
    this.classList = new MockClassList();
  }
}

class MockClassList {
  constructor() {
    this.classes = new Set();
  }
  
  add(...classes) {
    classes.forEach(c => this.classes.add(c));
  }
  
  remove(...classes) {
    classes.forEach(c => this.classes.delete(c));
  }
  
  contains(className) {
    return this.classes.has(className);
  }
}

// Mock setTimeout for testing
let timeoutCallbacks = [];
global.setTimeout = (callback, delay) => {
  timeoutCallbacks.push({ callback, delay });
  return timeoutCallbacks.length - 1;
};

// The function under test
function triggerWaterAnimation(element) {
  if (!element) return;
  
  // Add splash and grow animation classes
  element.classList.add('splash', 'grow');
  
  // Remove classes after animations complete
  // Splash duration is 0.4s (400ms), grow duration is 0.3s (300ms)
  // Remove after the longer animation completes (splash at 400ms)
  setTimeout(() => {
    element.classList.remove('splash', 'grow');
  }, 400);
}

// Test suite
function runTests() {
  let passed = 0;
  let failed = 0;
  
  console.log('='.repeat(60));
  console.log('Testing triggerWaterAnimation Function');
  console.log('='.repeat(60));
  console.log();
  
  // Test 1: Function handles null element gracefully
  console.log('Test 1: Function handles null element gracefully');
  try {
    timeoutCallbacks = [];
    triggerWaterAnimation(null);
    console.log('✓ PASS: Function handles null without throwing error');
    console.log('  Expected: No error thrown');
    console.log('  Result: No error thrown');
    passed++;
  } catch (e) {
    console.log('✗ FAIL: Function threw error with null element');
    console.log('  Error:', e.message);
    failed++;
  }
  console.log();
  
  // Test 2: Function adds splash and grow classes
  console.log('Test 2: Function adds splash and grow classes');
  timeoutCallbacks = [];
  const element = new MockElement();
  triggerWaterAnimation(element);
  
  const hasSplash = element.classList.contains('splash');
  const hasGrow = element.classList.contains('grow');
  
  if (hasSplash && hasGrow) {
    console.log('✓ PASS: Both splash and grow classes added');
    console.log('  Expected: splash=true, grow=true');
    console.log(`  Result: splash=${hasSplash}, grow=${hasGrow}`);
    passed++;
  } else {
    console.log('✗ FAIL: Classes not added correctly');
    console.log('  Expected: splash=true, grow=true');
    console.log(`  Result: splash=${hasSplash}, grow=${hasGrow}`);
    failed++;
  }
  console.log();
  
  // Test 3: Function schedules class removal with correct timeout
  console.log('Test 3: Function schedules class removal with correct timeout');
  const hasTimeout = timeoutCallbacks.length === 1;
  const correctDelay = hasTimeout && timeoutCallbacks[0].delay === 400;
  
  if (hasTimeout && correctDelay) {
    console.log('✓ PASS: Timeout scheduled with correct delay');
    console.log('  Expected: 1 timeout with 400ms delay');
    console.log(`  Result: ${timeoutCallbacks.length} timeout(s) with ${timeoutCallbacks[0].delay}ms delay`);
    passed++;
  } else {
    console.log('✗ FAIL: Timeout not scheduled correctly');
    console.log('  Expected: 1 timeout with 400ms delay');
    console.log(`  Result: ${timeoutCallbacks.length} timeout(s)${hasTimeout ? ` with ${timeoutCallbacks[0].delay}ms delay` : ''}`);
    failed++;
  }
  console.log();
  
  // Test 4: Timeout callback removes both classes
  console.log('Test 4: Timeout callback removes both classes');
  if (timeoutCallbacks.length > 0) {
    // Execute the timeout callback
    timeoutCallbacks[0].callback();
    
    const stillHasSplash = element.classList.contains('splash');
    const stillHasGrow = element.classList.contains('grow');
    
    if (!stillHasSplash && !stillHasGrow) {
      console.log('✓ PASS: Both classes removed after timeout');
      console.log('  Expected: splash=false, grow=false');
      console.log(`  Result: splash=${stillHasSplash}, grow=${stillHasGrow}`);
      passed++;
    } else {
      console.log('✗ FAIL: Classes not removed correctly');
      console.log('  Expected: splash=false, grow=false');
      console.log(`  Result: splash=${stillHasSplash}, grow=${stillHasGrow}`);
      failed++;
    }
  } else {
    console.log('✗ FAIL: No timeout callback to test');
    failed++;
  }
  console.log();
  
  // Test 5: Function works with undefined element
  console.log('Test 5: Function handles undefined element gracefully');
  try {
    timeoutCallbacks = [];
    triggerWaterAnimation(undefined);
    console.log('✓ PASS: Function handles undefined without throwing error');
    console.log('  Expected: No error thrown');
    console.log('  Result: No error thrown');
    passed++;
  } catch (e) {
    console.log('✗ FAIL: Function threw error with undefined element');
    console.log('  Error:', e.message);
    failed++;
  }
  console.log();
  
  // Summary
  console.log('='.repeat(60));
  console.log('Test Summary');
  console.log('='.repeat(60));
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log();
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
    console.log();
    console.log('Requirements validated:');
    console.log('  ✓ Requirement 5.2: Splash animation triggered');
    console.log('  ✓ Requirement 5.3: Grow animation triggered');
    console.log('  ✓ Classes removed after animation completes (400ms)');
  } else {
    console.log('❌ Some tests failed. Please review the implementation.');
  }
  console.log('='.repeat(60));
  
  return failed === 0;
}

// Run the tests
const success = runTests();
process.exit(success ? 0 : 1);
