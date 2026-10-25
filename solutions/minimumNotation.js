const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let s = input[ptr++];
    let n = s.length;
    let minSuffix = '9';
    let digits = [];
    for (let i = n - 1; i >= 0; i--) {
      let ch = s[i];
      if (ch > minSuffix) {
        let v = parseInt(ch, 10);
        digits.push(String(Math.min(v + 1, 9)));
      } else {
        digits.push(ch);
        minSuffix = ch;
      }
    }
    digits.sort();
    out.push(digits.join(''));
  }
  console.log(out.join('\n'));
}

solve();
