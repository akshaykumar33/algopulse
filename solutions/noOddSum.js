const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8');
let pos = 0;

function readInt() {
  while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
  if (pos >= input.length) return NaN;
  const start = pos;
  while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
  return parseInt(input.slice(start, pos), 10);
}

function solve() {
  const t = readInt();
  if (isNaN(t)) return;
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = readInt();
    out.push(new Array(n).fill(2).join(' '));
  }
  process.stdout.write(out.join('\n') + '\n');
}

solve();
