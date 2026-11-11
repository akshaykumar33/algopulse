const fs = require('fs');

function calc(s, l, r, code) {
  const len = r - l;
  if (len === 1) {
    return s.charCodeAt(l) === code ? 0 : 1;
  }
  const mid = l + (len >> 1);
  let leftDiff = 0;
  for (let i = l; i < mid; i++) {
    if (s.charCodeAt(i) !== code) leftDiff++;
  }
  let rightDiff = 0;
  for (let i = mid; i < r; i++) {
    if (s.charCodeAt(i) !== code) rightDiff++;
  }
  const c1 = leftDiff + calc(s, mid, r, code + 1);
  const c2 = rightDiff + calc(s, l, mid, code + 1);
  return c1 < c2 ? c1 : c2;
}

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    out.push(calc(s, 0, n, 97));
  }

  console.log(out.join('\n'));
}

solve();
