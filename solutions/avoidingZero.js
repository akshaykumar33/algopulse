const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let idx = 0;
const t = parseInt(input[idx++]);
const res = [];
for (let i = 0; i < t; i++) {
  const n = parseInt(input[idx++]);
  const arr = [];
  let sum = 0;
  for (let j = 0; j < n; j++) {
    const val = parseInt(input[idx++]);
    arr.push(val);
    sum += val;
  }
  if (sum === 0) {
    res.push('NO');
  } else {
    res.push('YES');
    if (sum > 0) {
      arr.sort((a, b) => b - a);
    } else {
      arr.sort((a, b) => a - b);
    }
    res.push(arr.join(' '));
  }
}
console.log(res.join('\n'));
