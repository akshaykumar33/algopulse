const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  let ones = 0;
  let zeros = 0;
  let inZeros = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '1') {
      ones++;
    } else if (input[i] === '0') {
      inZeros = true;
      zeros++;
    }
  }
  if (ones === 1) {
    console.log(input + ' 0');
    return;
  }
  const a = '1' + '0'.repeat(ones + zeros);
  const b = '1' + '0'.repeat(zeros);
  console.log(a + ' ' + b);
}

solve();
