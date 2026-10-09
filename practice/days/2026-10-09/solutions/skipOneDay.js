const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;
  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let sign = 1;
    if (buffer[offset] === 45) {
      sign = -1;
      offset++;
    }
    let res = 0;
    while (offset < buffer.length && buffer[offset] >= 48 && buffer[offset] <= 57) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res * sign;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let sum = 0;
    let minVal = Infinity;
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      sum += v;
      if (v < minVal) minVal = v;
    }
    out.push(sum - minVal);
  }
  console.log(out.join('\n'));
}

solve();
