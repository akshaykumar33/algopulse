const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    let ans = 0n;
    let ones = 0n;
    let i = 0;
    while (i < s.length) {
      if (s[i] === '1') {
        ones++;
        i++;
      } else {
        let zeros = 0n;
        while (i < s.length && s[i] === '0') {
          zeros++;
          i++;
        }
        if (ones > 0n) {
          ans += ones * (zeros + 1n);
        }
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
