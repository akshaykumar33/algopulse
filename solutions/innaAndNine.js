const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const s = input[0];
  let ans = 1n;
  let len = 1;

  for (let i = 0; i < s.length - 1; i++) {
    const d1 = s.charCodeAt(i) - 48;
    const d2 = s.charCodeAt(i + 1) - 48;
    if (d1 + d2 === 9) {
      len++;
    } else {
      if (len > 1 && len % 2 === 1) {
        ans *= BigInt(Math.floor((len + 1) / 2));
      }
      len = 1;
    }
  }
  if (len > 1 && len % 2 === 1) {
    ans *= BigInt(Math.floor((len + 1) / 2));
  }
  console.log(ans.toString());
}

solve();
