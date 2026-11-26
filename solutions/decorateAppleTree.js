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

function solve() {
  const n = nextInt();
  const p = new Int32Array(n + 1);
  const hasChild = new Uint8Array(n + 1);
  for (let i = 2; i <= n; i++) {
    p[i] = nextInt();
    hasChild[p[i]] = 1;
  }
  const leaves = new Int32Array(n + 1);
  for (let i = n; i >= 1; i--) {
    if (!hasChild[i]) leaves[i] = 1;
    if (i > 1) leaves[p[i]] += leaves[i];
  }
  const arr = leaves.subarray(1, n + 1);
  arr.sort();
  console.log(arr.join(' '));
}

solve();
