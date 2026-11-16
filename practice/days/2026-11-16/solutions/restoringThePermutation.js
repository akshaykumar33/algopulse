const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const q = new Int32Array(n);
    for (let i = 0; i < n; i++) q[i] = parseInt(input[ptr++], 10);

    const minAns = new Int32Array(n);
    const maxAns = new Int32Array(n);
    const usedMin = new Uint8Array(n + 1);
    const usedMax = new Uint8Array(n + 1);

    for (let i = 0; i < n; i++) {
      if (i === 0 || q[i] !== q[i - 1]) {
        minAns[i] = q[i];
        maxAns[i] = q[i];
        usedMin[q[i]] = 1;
        usedMax[q[i]] = 1;
      }
    }

    let minPtr = 1;
    for (let i = 0; i < n; i++) {
      if (minAns[i] === 0) {
        while (usedMin[minPtr]) minPtr++;
        minAns[i] = minPtr;
        usedMin[minPtr] = 1;
      }
    }

    const avail = [];
    let curMax = 1;
    for (let i = 0; i < n; i++) {
      if (maxAns[i] !== 0) {
        while (curMax < maxAns[i]) {
          if (!usedMax[curMax]) avail.push(curMax);
          curMax++;
        }
        curMax = maxAns[i] + 1;
      } else {
        maxAns[i] = avail.pop();
      }
    }

    out.push(minAns.join(' '));
    out.push(maxAns.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
