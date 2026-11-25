const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let neg = false;
  if (buf[ptr] === 45) {
    neg = true;
    ptr++;
  }
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return neg ? -x : x;
}

const out = [];
const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

function solve() {
  const t = nextInt();
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const total = n * m;
    const grid = new Int32Array(total);
    for (let i = 0; i < total; i++) grid[i] = nextInt();
    const vals = new Int32Array(total);
    let best = 0;
    for (let d = 0; d < 4; d++) {
      const dr = dirs[d][0];
      const dc = dirs[d][1];
      let k = 0;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          vals[k] = grid[k] - i * dr - j * dc;
          k++;
        }
      }
      vals.sort();
      let run = 1;
      for (let i = 1; i < total; i++) {
        if (vals[i] === vals[i - 1]) {
          run++;
        } else {
          if (run > best) best = run;
          run = 1;
        }
      }
      if (run > best) best = run;
    }
    out.push(total - best);
  }
}

solve();
console.log(out.join('\n'));
