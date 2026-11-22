const fs = require('fs');
const val = new Int32Array(505);
const pre = new Int32Array(505);
val[0] = 1;
pre[1] = 1;
let cur = 2;
for (let i = 1; i < 500; i++) {
  while (true) {
    let found = false;
    for (let j = i - 1; j >= 0; j--) {
      if ((cur + (pre[i] - pre[j])) % (i + 1 - j) === 0) {
        found = true;
        break;
      }
    }
    if (!found) break;
    else cur++;
  }
  pre[i + 1] = pre[i] + cur;
  val[i] = cur;
  cur++;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) arr.push(val[i]);
    out.push(arr.join(' '));
  }
  console.log(out.join('\n'));
}
solve();