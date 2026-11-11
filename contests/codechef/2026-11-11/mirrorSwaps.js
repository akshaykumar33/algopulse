const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readIntArray();
    const p = n >> 1;
    let v0 = 0, c0 = 0, v1 = 0, c1 = 1;
    for (let k = 0; k + 1 < p; k++) {
      const l = a[k], r = a[n - 1 - k], nl = a[k + 1], nr = a[n - 2 - k];
      let nv0 = -1, nc0 = 0, nv1 = -1, nc1 = 0;
      for (let s = 0; s < 2; s++) {
        const v = s ? v1 : v0, c = s ? c1 : c0;
        const x = s ? r : l, y = s ? l : r;
        for (let u = 0; u < 2; u++) {
          const nx = u ? nr : nl, ny = u ? nl : nr;
          const w = v + Math.abs(x - nx) + Math.abs(y - ny);
          const wc = c + u;
          if (u) {
            if (w > nv1 || (w === nv1 && wc < nc1)) { nv1 = w; nc1 = wc; }
          } else {
            if (w > nv0 || (w === nv0 && wc < nc0)) { nv0 = w; nc0 = wc; }
          }
        }
      }
      v0 = nv0; c0 = nc0; v1 = nv1; c1 = nc1;
    }
    let ans, cnt;
    if (v0 > v1 || (v0 === v1 && c0 <= c1)) { ans = v0; cnt = c0; } else { ans = v1; cnt = c1; }
    if (n & 1) ans += Math.abs(a[p - 1] - a[p]) + Math.abs(a[p] - a[n - p]);
    else ans += Math.abs(a[p - 1] - a[p]);
    print(ans + ' ' + cnt);
  }
}

solve();
printAll();
