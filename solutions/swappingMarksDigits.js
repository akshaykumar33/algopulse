const fs = require('fs');

function rev(x) {
  return (x % 10) * 10 + Math.floor(x / 10);
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const [a, b] = input[i].trim().split(/\s+/).map(Number);
    const maxA = Math.max(a, rev(a));
    const minB = Math.min(b, rev(b));
    out.push(maxA > minB ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
}

solve();
