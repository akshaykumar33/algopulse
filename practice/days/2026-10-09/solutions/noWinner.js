const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    if (!input[i]) break;
    const parts = input[i].trim().split(/\s+/).map(Number);
    if (parts.length < 4) continue;
    const [a, b, c, m] = parts;
    if (Math.abs(a - b) <= m || Math.abs(a - c) <= m || Math.abs(b - c) <= m) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }
  console.log(out.join('\n'));
}

solve();
