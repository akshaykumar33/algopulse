'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextToken() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('ascii', start, pos);
  }

  const nStr = nextToken();
  if (!nStr) return;
  const n = BigInt(nStr);
  const k = parseInt(nextToken(), 10);
  const s = BigInt(nextToken());

  const maxStep = n - 1n;
  if (BigInt(k) > s || s > BigInt(k) * maxStep) {
    console.log('NO');
    return;
  }

  let remDist = s;
  let cur = 1;
  const res = new Int32Array(k);

  for (let i = 0; i < k; i++) {
    const remMoves = BigInt(k - 1 - i);
    const avail = remDist - remMoves;
    const stepBI = avail < maxStep ? avail : maxStep;
    const d = Number(stepBI);
    remDist -= stepBI;

    if (cur + d <= Number(n)) {
      cur += d;
    } else {
      cur -= d;
    }
    res[i] = cur;
  }

  console.log('YES\n' + res.join(' '));
}

solve();
