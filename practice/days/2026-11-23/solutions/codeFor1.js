const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 3) return;
  const n = BigInt(input[0]);
  const l = BigInt(input[1]);
  const r = BigInt(input[2]);
  function getLen(x) {
    if (x <= 1n) return 1n;
    return 2n * getLen(x / 2n) + 1n;
  }
  function countOnes(x, ql, qr, cl, cr) {
    if (cr < ql || cl > qr) return 0n;
    if (x === 0n) return 0n;
    if (x === 1n) return 1n;
    const half = (cr - cl) / 2n;
    const mid = cl + half;
    let res = 0n;
    res += countOnes(x / 2n, ql, qr, cl, mid - 1n);
    if (mid >= ql && mid <= qr) res += (x % 2n);
    res += countOnes(x / 2n, ql, qr, mid + 1n, cr);
    return res;
  }
  const totalLen = getLen(n);
  const ans = countOnes(n, l, r, 1n, totalLen);
  console.log(ans.toString());
}

solve();
