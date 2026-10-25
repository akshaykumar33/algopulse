const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let freq = new Map();
    for (let i = 0; i < n; i++) {
      let v = parseInt(input[ptr++], 10);
      freq.set(v, (freq.get(v) || 0) + 1);
    }
    let keys = Array.from(freq.keys()).sort((a, b) => b - a);
    let sides = [];
    for (let len of keys) {
      let count = freq.get(len);
      while (count >= 2 && sides.length < 2) {
        sides.push(len);
        count -= 2;
      }
      if (sides.length === 2) break;
    }
    if (sides.length === 2) {
      out.push(sides[0] * sides[1]);
    } else {
      out.push(-1);
    }
  }
  console.log(out.join('\n'));
}

solve();
