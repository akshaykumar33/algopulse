const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  const n = parseInt(data[0], 10);
  const a = new Int32Array(n);
  const pos = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    const v = parseInt(data[i + 1], 10);
    a[i] = v;
    pos[v] = i;
  }
  const win = new Uint8Array(n);
  for (let v = n; v >= 1; v--) {
    const i = pos[v];
    let w = 0;
    for (let j = i + v; j < n; j += v) {
      if (a[j] > v && win[j] === 0) {
        w = 1;
        break;
      }
    }
    if (w === 0) {
      for (let j = i - v; j >= 0; j -= v) {
        if (a[j] > v && win[j] === 0) {
          w = 1;
          break;
        }
      }
    }
    win[i] = w;
  }
  let res = '';
  for (let i = 0; i < n; i++) {
    res += win[i] ? 'A' : 'B';
  }
  console.log(res);
}

solve();
