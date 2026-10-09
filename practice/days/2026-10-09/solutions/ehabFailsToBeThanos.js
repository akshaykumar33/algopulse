const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length >= 2) {
  const n = parseInt(input[0], 10);
  const arr = [];
  for (let i = 1; i <= 2 * n; i++) {
    arr.push(parseInt(input[i], 10));
  }
  arr.sort((a, b) => a - b);
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < n; i++) {
    sum1 += arr[i];
  }
  for (let i = n; i < 2 * n; i++) {
    sum2 += arr[i];
  }
  if (sum1 === sum2) {
    console.log(-1);
  } else {
    console.log(arr.join(' '));
  }
}
