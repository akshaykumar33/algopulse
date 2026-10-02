const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0]);
  const out = [];
  let lineIdx = 1;

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[lineIdx++]);
    const s = input[lineIdx++];

    if (n % 2 === 1) {
      let foundOddAtOdd = false;
      for (let j = 0; j < n; j += 2) {
        if (parseInt(s[j]) % 2 === 1) {
          foundOddAtOdd = true;
          break;
        }
      }
      if (foundOddAtOdd) {
        out.push('1');
      } else {
        out.push('2');
      }
    } else {
      let foundEvenAtEven = false;
      for (let j = 1; j < n; j += 2) {
        if (parseInt(s[j]) % 2 === 0) {
          foundEvenAtEven = true;
          break;
        }
      }
      if (foundEvenAtEven) {
        out.push('2');
      } else {
        out.push('1');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
