/**
 * Problem: Seating
 * Platform: CodeChef
 * Language: JavaScript (Node.js)
 * Complexity: O(N) Time, O(N) Space per test case
 */

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (!tokens || tokens.length === 0 || isNaN(tokens[0])) return;

  let ptr = 0;
  const t = tokens[ptr++];
  const out = [];

  for (let tc = 0; tc < t && ptr < tokens.length; tc++) {
    const n = tokens[ptr++];
    const m = tokens[ptr++];
    const k = tokens[ptr++];

    const occupied = new Uint8Array(n + 1);
    for (let i = 0; i < m; i++) {
      occupied[tokens[ptr++]] = 1;
    }

    const res = [];
    for (let s = 1; s <= n && res.length < k; s++) {
      if (!occupied[s]) {
        res.push(s);
      }
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
