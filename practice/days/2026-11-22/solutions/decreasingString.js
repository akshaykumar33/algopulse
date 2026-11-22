const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  let res = '';
  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    let pos = BigInt(input[ptr++]);
    const n = s.length;
    let k = 0;
    let len = BigInt(n);
    while (pos > len) {
      pos -= len;
      k++;
      len--;
    }
    const stack = [];
    let toDrop = k;
    for (let i = 0; i < n; i++) {
      const c = s[i];
      while (toDrop > 0 && stack.length > 0 && stack[stack.length - 1] > c) {
        stack.pop();
        toDrop--;
      }
      stack.push(c);
    }
    while (toDrop > 0) {
      stack.pop();
      toDrop--;
    }
    res += stack[Number(pos) - 1];
  }
  console.log(res);
}
solve();