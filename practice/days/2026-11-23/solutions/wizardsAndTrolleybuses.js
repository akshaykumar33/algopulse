const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length < 3) return;
  const n = input[0];
  const a = input[1];
  const d = input[2];
  let idx = 3;
  let lastArr = 0;
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = input[idx++];
    const v = input[idx++];
    const s = (v * v) / (2 * a);
    let time;
    if (s >= d) {
      time = Math.sqrt((2 * d) / a);
    } else {
      time = (v / a) + ((d - s) / v);
    }
    const arr = Math.max(t + time, lastArr);
    lastArr = arr;
    out.push(arr.toFixed(10));
  }
  console.log(out.join('\n'));
}

solve();
