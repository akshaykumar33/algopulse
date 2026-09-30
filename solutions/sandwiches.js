/**
 * Problem: Sandwiches
 * Platform: CodeChef
 * Language: JavaScript (Node.js)
 * Complexity: O(1) Time, O(1) Space per test case
 */

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;

  const firstTokens = input[0].trim().split(/\s+/).map(Number);
  const out = [];

  if (firstTokens.length === 1 && input.length > 1) {
    const t = firstTokens[0];
    for (let i = 1; i <= t && i < input.length; i++) {
      if (!input[i].trim()) continue;
      const [b, h, c] = input[i].trim().split(/\s+/).map(Number);
      out.push(Math.min(Math.floor(b / 2), h + c));
    }
  } else {
    for (const line of input) {
      if (!line.trim()) continue;
      const tokens = line.trim().split(/\s+/).map(Number);
      if (tokens.length >= 3) {
        const [b, h, c] = tokens;
        out.push(Math.min(Math.floor(b / 2), h + c));
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
