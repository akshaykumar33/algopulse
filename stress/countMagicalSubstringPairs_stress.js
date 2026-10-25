const solve = require('../contests/leetcode/2026-10-24/countMagicalSubstringPairs');

function bruteForce(s) {
  const n = s.length;
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        const set1 = new Set();
        for (let idx = i; idx <= j; idx++) set1.add(s[idx]);
        const set2 = new Set();
        for (let idx = j + 1; idx <= k; idx++) set2.add(s[idx]);
        if (set1.size === set2.size) count++;
      }
    }
  }
  return count;
}

let testedCount = 0;

for (let len = 2; len <= 5; len++) {
  function generate(curr) {
    if (curr.length === len) {
      const str = curr.join('');
      const exp = bruteForce(str);
      const act = solve(str);
      if (exp !== act) {
        console.error(`Mismatch on str="${str}": expected ${exp}, got ${act}`);
        process.exit(1);
      }
      testedCount++;
      return;
    }
    for (const ch of ['a', 'b', 'c']) {
      curr.push(ch);
      generate(curr);
      curr.pop();
    }
  }
  generate([]);
}

console.log(`Exhaustive small-input testing passed: ${testedCount} cases.`);

const letters = 'abcdefghijklmnopqrstuvwxyz';
const shapes = [
  (n) => 'a'.repeat(n),
  (n) => Array.from({ length: n }, (_, i) => (i % 2 === 0 ? 'a' : 'b')).join(''),
  (n) => Array.from({ length: n }, (_, i) => letters[i % 26]).join(''),
  (n) => Array.from({ length: n }, () => letters[Math.floor(Math.random() * 5)]).join(''),
  (n) => Array.from({ length: n }, () => letters[Math.floor(Math.random() * 26)]).join(''),
];

for (let round = 0; round < 1000; round++) {
  const n = Math.floor(Math.random() * 25) + 2;
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const str = shape(n);

  const exp = bruteForce(str);
  const act = solve(str);
  if (exp !== act) {
    console.error(`Mismatch on round ${round}, str="${str}": expected ${exp}, got ${act}`);
    process.exit(1);
  }
  testedCount++;
}

console.log(`Randomized stress testing passed: total ${testedCount} cases.`);

const maxN = 2000;
const worstCaseStr = Array.from({ length: maxN }, () => letters[Math.floor(Math.random() * 26)]).join('');

const start = performance.now();
const res = solve(worstCaseStr);
const elapsed = performance.now() - start;

console.log(`Worst-case timing (N = ${maxN}): ${elapsed.toFixed(2)}ms (result = ${res})`);
console.log('All verification checks passed successfully.');
