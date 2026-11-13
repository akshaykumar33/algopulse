const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Float64Array(n);
    let baseSum = 0;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      if (i % 2 === 0) {
        baseSum += a[i];
      }
    }

    let maxGain1 = 0;
    let curGain1 = 0;
    for (let i = 0; i + 1 < n; i += 2) {
      const diff = a[i + 1] - a[i];
      curGain1 = Math.max(0, curGain1 + diff);
      if (curGain1 > maxGain1) {
        maxGain1 = curGain1;
      }
    }

    let maxGain2 = 0;
    let curGain2 = 0;
    for (let i = 1; i + 1 < n; i += 2) {
      const diff = a[i] - a[i + 1];
      curGain2 = Math.max(0, curGain2 + diff);
      if (curGain2 > maxGain2) {
        maxGain2 = curGain2;
      }
    }

    const total = BigInt(Math.round(baseSum + Math.max(maxGain1, maxGain2)));
    out.push(total.toString());
  }

  console.log(out.join('\n'));
}

solve();
