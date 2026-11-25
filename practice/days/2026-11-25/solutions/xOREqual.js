const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return x;
}

const out = [];

function solve() {
  const t = nextInt();
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const x = nextInt();
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      freq.set(v, (freq.get(v) || 0) + 1);
    }
    let bestCnt = 0;
    let bestOps = 0;
    if (x === 0) {
      for (const c of freq.values()) {
        if (c > bestCnt) bestCnt = c;
      }
    } else {
      for (const [v, c] of freq) {
        const ops = freq.get(v ^ x) || 0;
        const tot = c + ops;
        if (tot > bestCnt || (tot === bestCnt && ops < bestOps)) {
          bestCnt = tot;
          bestOps = ops;
        }
      }
    }
    out.push(`${bestCnt} ${bestOps}`);
  }
}

solve();
console.log(out.join('\n'));
