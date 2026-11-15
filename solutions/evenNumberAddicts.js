const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  const memo = new Map();
  function getWin(c0, c1, sumParity, turn) {
    if (c0 === 0 && c1 === 0) return sumParity === 0;
    const key = (c0 << 12) | (c1 << 2) | (sumParity << 1) | turn;
    if (memo.has(key)) return memo.get(key);
    let res;
    if (turn === 0) {
      res = false;
      if (c0 > 0 && getWin(c0 - 1, c1, sumParity, 1)) res = true;
      if (c1 > 0 && getWin(c0, c1 - 1, sumParity ^ 1, 1)) res = true;
    } else {
      res = true;
      if (c0 > 0 && !getWin(c0 - 1, c1, sumParity, 0)) res = false;
      if (c1 > 0 && !getWin(c0, c1 - 1, sumParity, 0)) res = false;
    }
    memo.set(key, res);
    return res;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let c0 = 0, c1 = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (Math.abs(v) % 2 === 0) c0++;
      else c1++;
    }
    out.push(getWin(c0, c1, 0, 0) ? 'Alice' : 'Bob');
  }
  console.log(out.join('\n'));
}

solve();
