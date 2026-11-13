const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const m = Number(input[ptr++]);
    const k = Number(input[ptr++]);
    const l = Number(input[ptr++]);
    const r = Number(input[ptr++]);
    let minPrice = -1;
    for (let i = 0; i < n; i++) {
      const c = Number(input[ptr++]);
      const p = Number(input[ptr++]);
      let temp = c;
      if (c > k) {
        temp = Math.max(k, c - m);
      } else if (c < k) {
        temp = Math.min(k, c + m);
      } else {
        temp = k;
      }
      if (temp >= l && temp <= r) {
        if (minPrice === -1 || p < minPrice) {
          minPrice = p;
        }
      }
    }
    out.push(minPrice.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
