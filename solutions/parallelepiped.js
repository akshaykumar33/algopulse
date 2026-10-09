const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 3 || input[0] === '') return;
  const s1 = parseFloat(input[0]);
  const s2 = parseFloat(input[1]);
  const s3 = parseFloat(input[2]);
  const v = Math.sqrt(s1 * s2 * s3);
  const x = v / s2;
  const y = v / s3;
  const z = v / s1;
  const ans = 4 * (x + y + z);
  console.log(Math.round(ans));
}
solve();
