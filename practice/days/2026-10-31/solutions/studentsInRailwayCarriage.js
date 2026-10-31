const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  let a = parseInt(tokens[ptr++], 10);
  let b = parseInt(tokens[ptr++], 10);
  const s = tokens[ptr++];

  const initA = a;
  const initB = b;

  let curLen = 0;
  for (let i = 0; i <= n; i++) {
    if (i < n && s[i] === '.') {
      curLen++;
    } else {
      if (curLen > 0) {
        const c1 = Math.floor((curLen + 1) / 2);
        const c2 = Math.floor(curLen / 2);

        if (a < b) {
          const takeB = Math.min(b, c1);
          b -= takeB;
          const takeA = Math.min(a, c2);
          a -= takeA;
        } else {
          const takeA = Math.min(a, c1);
          a -= takeA;
          const takeB = Math.min(b, c2);
          b -= takeB;
        }
        curLen = 0;
      }
    }
  }

  const placed = (initA - a) + (initB - b);
  console.log(placed);
}

solve();
