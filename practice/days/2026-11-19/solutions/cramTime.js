const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;

  const a = Number(input[0]);
  const b = Number(input[1]);

  let low = 0;
  let high = 100000;
  let bestK = 0;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const total = (mid * (mid + 1)) / 2;
    if (total <= a + b) {
      bestK = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const day1 = [];
  const day2 = [];
  let remA = a;

  for (let i = bestK; i >= 1; i--) {
    if (i <= remA) {
      day1.push(i);
      remA -= i;
    } else {
      day2.push(i);
    }
  }

  console.log(day1.length);
  if (day1.length > 0) console.log(day1.join(' '));
  else console.log('');
  console.log(day2.length);
  if (day2.length > 0) console.log(day2.join(' '));
  else console.log('');
}

solve();
