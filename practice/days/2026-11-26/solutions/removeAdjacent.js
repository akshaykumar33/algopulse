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

function nextStr() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  const start = ptr;
  while (ptr < buf.length && buf[ptr] > 32) ptr++;
  return buf.toString('ascii', start, ptr);
}

function solve() {
  const n = nextInt();
  const s = nextStr();
  let arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = s.charCodeAt(i) - 97;
  let ans = 0;
  for (let ch = 25; ch >= 1; ch--) {
    let changed = true;
    while (changed) {
      changed = false;
      const next = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ch) {
          const leftOk = i > 0 && arr[i - 1] === ch - 1;
          const rightOk = i + 1 < arr.length && arr[i + 1] === ch - 1;
          if (leftOk || rightOk) {
            ans++;
            changed = true;
            continue;
          }
        }
        next.push(arr[i]);
      }
      arr = next;
    }
  }
  console.log(ans);
}

solve();
