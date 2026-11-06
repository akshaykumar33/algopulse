const lines = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
const t = parseInt(lines[0]);
const output = [];
let p = 1;
for (let tc = 0; tc < t; tc++) {
  const n = parseInt(lines[p++]);
  const arr = lines[p++].trim().split(/\s+/).map(Number).sort((a, b) => b - a);
  let x = 0, y = 0;
  for (let i = 0; i < n; i++) {
    const v = 2 ** arr[i];
    if (x <= y) x += v;
    else y += v;
  }
  output.push((BigInt(x) * BigInt(y)).toString());
}
console.log(output.join('\n'));
