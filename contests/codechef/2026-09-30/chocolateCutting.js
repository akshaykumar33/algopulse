/**
 * Problem: Chocolate Cutting
 * Platform: CodeChef
 * Language: JavaScript (Node.js)
 * Complexity: O(1) Time, O(1) Space per test case
 */

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (!tokens || tokens.length === 0 || isNaN(tokens[0])) return;

  const out = [];

  if (tokens.length === 2) {
    // Single test case: N M
    const [n, m] = tokens;
    out.push((n % 2 === 0 || m % 2 === 0) ? 'Yes' : 'No');
  } else {
    // First token is T denoting number of test cases
    const t = tokens[0];
    let ptr = 1;
    for (let i = 0; i < t && ptr + 1 < tokens.length; i++) {
      const n = tokens[ptr++];
      const m = tokens[ptr++];
      out.push((n % 2 === 0 || m % 2 === 0) ? 'Yes' : 'No');
    }
  }

  console.log(out.join('\n'));
}

solve();
