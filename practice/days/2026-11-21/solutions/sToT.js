const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const sStr = input[ptr++];
    const tStr = input[ptr++];
    if (sStr === tStr) {
      out.push(0);
      continue;
    }
    const p = sStr.indexOf('1');
    if (p === -1) {
      out.push(-1);
      continue;
    }
    let ok = true;
    for (let i = 0; i < p; i++) {
      if (tStr[i] === '1') {
        ok = false;
        break;
      }
    }
    if (!ok || tStr[p] === '0') {
      out.push(-1);
      continue;
    }

    const s = sStr.split('').map(Number);
    const ops = [];

    for (let i = p; i < n - 1; i++) {
      if (s[i + 1] === 0) {
        ops.push(i + 1);
        s[i + 1] = 1;
      }
    }

    for (let j = n - 1; j > p; j--) {
      const target = Number(tStr[j]);
      if (s[j] !== target) {
        ops.push(j);
        s[j] = target;
      }
    }

    out.push(ops.length);
    if (ops.length > 0) out.push(ops.join(' '));
  }
  console.log(out.join('\n'));
}
solve();