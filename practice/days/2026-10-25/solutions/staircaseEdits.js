/**
 * Problem: Staircase Edits
 * Platform: CodeChef
 * Language: JavaScript (Node.js)
 * Complexity: O(N) Time, O(N) Space per test case, O(sum N) total
 */

const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let sign = 1;
    if (buffer[offset] === 45) {
      sign = -1;
      offset++;
    }
    let res = 0;
    while (offset < buffer.length && buffer[offset] >= 48 && buffer[offset] <= 57) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;

    const freq = new Map();
    let maxFreq = 0;

    for (let i = 0; i < n; i++) {
      const val = nextInt();
      const diff = val - i;
      const count = (freq.get(diff) || 0) + 1;
      freq.set(diff, count);
      if (count > maxFreq) {
        maxFreq = count;
      }
    }

    out.push(n - maxFreq);
  }

  console.log(out.join('\n'));
}

solve();
