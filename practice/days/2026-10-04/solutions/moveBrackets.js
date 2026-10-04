const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let idx = 0;
const t = parseInt(input[idx++], 10);
const res = [];
for (let i = 0; i < t; i++) {
  const n = parseInt(input[idx++], 10);
  const s = input[idx++];
  let bal = 0;
  let ans = 0;
  for (let j = 0; j < n; j++) {
    if (s[j] === '(') {
      bal++;
    } else {
      if (bal > 0) {
        bal--;
      } else {
        ans++;
      }
    }
  }
  res.push(ans);
}
console.log(res.join('\n'));
