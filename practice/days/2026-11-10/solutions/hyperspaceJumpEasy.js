const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const m = parseInt(tokens[0], 10);

  const keys = [];
  const freq = new Map();

  for (let i = 0; i < m; i++) {
    const s = tokens[1 + i];
    const match = s.match(/\((\d+)\+(\d+)\)\/(\d+)/);
    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    const c = parseInt(match[3], 10);

    let num = a + b;
    let den = c;
    const g = gcd(num, den);
    num = Math.floor(num / g);
    den = Math.floor(den / g);

    const key = num + '/' + den;
    keys.push(key);
    freq.set(key, (freq.get(key) || 0) + 1);
  }

  const out = [];
  for (let i = 0; i < m; i++) {
    out.push(freq.get(keys[i]));
  }

  console.log(out.join(' '));
}

solve();
