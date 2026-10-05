const fs = require('fs');

function testNextLevel() {
  const { execSync } = require('child_process');
  const cases = [
    { input: '1\n', expected: 'NO' },
    { input: '59\n', expected: 'NO' },
    { input: '60\n', expected: 'YES' },
    { input: '61\n', expected: 'YES' },
    { input: '100\n', expected: 'YES' }
  ];

  for (const c of cases) {
    fs.writeFileSync('input.txt', c.input);
    execSync('node run nextLevel');
    const actual = fs.readFileSync('output.txt', 'utf-8').trim();
    if (actual !== c.expected) {
      throw new Error(`nextLevel edge case failed for input ${c.input.trim()}: expected ${c.expected}, got ${actual}`);
    }
  }
  console.log('✓ nextLevel passed all boundary edge cases.');
}

function testSkipOneDay() {
  const { execSync } = require('child_process');
  const input = `4
1
5
2
-100 -100
5
-10 -20 -30 -40 -50
5
100 100 100 100 100
`;
  const expected = ['0', '-100', '-100', '400'].join('\n');
  fs.writeFileSync('input.txt', input);
  execSync('node run skipOneDay');
  const actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== expected) {
    throw new Error(`skipOneDay edge case failed:\nexpected:\n${expected}\ngot:\n${actual}`);
  }
  console.log('✓ skipOneDay passed all boundary edge cases.');
}

function testPyramidOfBricks() {
  const { execSync } = require('child_process');
  const input = `6
1
2
3
5
6
1000000000
`;
  const expected = ['1', '1', '2', '2', '3', '44720'].join('\n');
  fs.writeFileSync('input.txt', input);
  execSync('node run pyramidOfBricks');
  const actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== expected) {
    throw new Error(`pyramidOfBricks edge case failed:\nexpected:\n${expected}\ngot:\n${actual}`);
  }
  console.log('✓ pyramidOfBricks passed all boundary edge cases.');
}

function testDistanceBetweenTwoNodes() {
  const { execSync } = require('child_process');
  
  // Case 1: u === v
  fs.writeFileSync('input.txt', '3 2 2\n1 2\n1 3\n');
  execSync('node run distanceBetweenTwoNodes');
  let actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== '0') throw new Error(`distanceBetweenTwoNodes u===v failed, got ${actual}`);

  // Case 2: Star graph leaf to leaf
  fs.writeFileSync('input.txt', '4 2 3\n1 2\n1 3\n1 4\n');
  execSync('node run distanceBetweenTwoNodes');
  actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== '2') throw new Error(`distanceBetweenTwoNodes star graph failed, got ${actual}`);

  console.log('✓ distanceBetweenTwoNodes passed all boundary edge cases.');
}

function testBirthdayFeast() {
  const { execSync } = require('child_process');

  fs.writeFileSync('input.txt', '1 1\n1\n1\n10000\n');
  execSync('node run birthdayFeast');
  let actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== '10000') throw new Error(`birthdayFeast single friend single dish failed, got ${actual}`);

  fs.writeFileSync('input.txt', '1 2\n10\n1 5\n10 2\n');
  execSync('node run birthdayFeast');
  actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== '4') throw new Error(`birthdayFeast knapsack optimal failed, got ${actual}`);

  console.log('✓ birthdayFeast passed all boundary edge cases.');
}

function testLcaOfTwoNodes() {
  const { execSync } = require('child_process');

  // Case 1: u === v
  fs.writeFileSync('input.txt', '3 2 2\n1 2\n1 3\n');
  execSync('node run lcaOfTwoNodes');
  let actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== '2') throw new Error(`lcaOfTwoNodes u===v failed, got ${actual}`);

  // Case 2: u is parent of v
  fs.writeFileSync('input.txt', '3 1 2\n1 2\n1 3\n');
  execSync('node run lcaOfTwoNodes');
  actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== '1') throw new Error(`lcaOfTwoNodes parent-child failed, got ${actual}`);

  // Case 3: Leaf to leaf on star graph
  fs.writeFileSync('input.txt', '4 2 3\n1 2\n1 3\n1 4\n');
  execSync('node run lcaOfTwoNodes');
  actual = fs.readFileSync('output.txt', 'utf-8').trim();
  if (actual !== '1') throw new Error(`lcaOfTwoNodes star graph failed, got ${actual}`);

  console.log('✓ lcaOfTwoNodes passed all boundary edge cases.');
}

try {
  console.log('Starting comprehensive edge case verification across all 6 problem solutions...\n');
  testNextLevel();
  testSkipOneDay();
  testPyramidOfBricks();
  testDistanceBetweenTwoNodes();
  testBirthdayFeast();
  testLcaOfTwoNodes();
  console.log('\nSUCCESS! All 6 problem solutions passed 100% of edge case validations.');
} catch (err) {
  console.error('\nFAIL:', err.message);
  process.exit(1);
}
