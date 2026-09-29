const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();

function solve() {
  let res = '';
  let i = 0;
  while (i < input.length) {
    if (input[i] === '.') {
      res += '0';
      i++;
    } else if (input[i] === '-') {
      if (input[i + 1] === '.') {
        res += '1';
        i += 2;
      } else {
        res += '2';
        i += 2;
      }
    } else {
      i++;
    }
  }
  console.log(res);
}

solve();
