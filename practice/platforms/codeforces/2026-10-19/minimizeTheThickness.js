const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let lineIdx = 0;
const t = parseInt(lines[lineIdx++]);
const res = [];
for (let tc = 0; tc < t; tc++) {
  const n = parseInt(lines[lineIdx++]);
  const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);
  let ans = n;
  for (let i = 0; i < n; i++) {
    let target = 0;
    for (let k = 0; k <= i; k++) target += arr[k];
    let curSum = 0;
    let curLen = 0;
    let maxLen = i + 1;
    let possible = true;
    let j = i + 1;
    while (j < n) {
      curSum += arr[j];
      curLen++;
      if (curSum === target) {
        maxLen = Math.max(maxLen, curLen);
        curSum = 0;
        curLen = 0;
      } else if (curSum > target) {
        possible = false;
        break;
      }
      j++;
    }
    if (possible && curSum === 0) {
      ans = Math.min(ans, maxLen);
    }
  }
  res.push(ans);
}
console.log(res.join('\n'));
