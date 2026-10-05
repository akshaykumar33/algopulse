const fs = require('fs');

function oracle(x) {
  return x >= 60 ? 'YES' : 'NO';
}

function solve(x) {
  return x >= 60 ? 'YES' : 'NO';
}

let passed = 0;
for (let x = 1; x <= 100; x++) {
  const expected = oracle(x);
  const actual = solve(x);
  if (expected !== actual) {
    console.error(`Mismatch for X=${x}: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  passed++;
}

console.log(`Successfully verified all ${passed} test cases (1 <= X <= 100).`);
