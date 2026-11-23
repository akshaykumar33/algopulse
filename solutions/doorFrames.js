const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length < 3) return;
  const [n, a, b] = input;
  const pieces = [a, a, a, a, b, b];
  let minBars = 6;
  const p = [0, 1, 2, 3, 4, 5];
  function permute(l) {
    if (l === 6) {
      let bars = 1;
      let cur = n;
      for (let i = 0; i < 6; i++) {
        const len = pieces[p[i]];
        if (cur >= len) {
          cur -= len;
        } else {
          bars++;
          cur = n - len;
        }
      }
      if (bars < minBars) minBars = bars;
      return;
    }
    for (let i = l; i < 6; i++) {
      let tmp = p[l]; p[l] = p[i]; p[i] = tmp;
      permute(l + 1);
      tmp = p[l]; p[l] = p[i]; p[i] = tmp;
    }
  }
  permute(0);
  console.log(minBars);
}

solve();
