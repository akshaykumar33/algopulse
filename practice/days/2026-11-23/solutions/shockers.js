const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || !input[0]) return;
  const n = parseInt(input[0], 10);
  let possible = (1 << 26) - 1;
  let ans = 0;
  let idx = 1;
  function countBits(m) {
    let c = 0;
    while (m) { c += m & 1; m >>= 1; }
    return c;
  }
  for (let i = 0; i < n; i++) {
    const type = input[idx++];
    const word = input[idx++];
    const isSingle = countBits(possible) === 1;
    if (i === n - 1) break;
    if (type === '!') {
      if (isSingle) {
        ans++;
      } else {
        let mask = 0;
        for (let j = 0; j < word.length; j++) {
          mask |= (1 << (word.charCodeAt(j) - 97));
        }
        possible &= mask;
      }
    } else if (type === '.') {
      let mask = 0;
      for (let j = 0; j < word.length; j++) {
        mask |= (1 << (word.charCodeAt(j) - 97));
      }
      possible &= ~mask;
    } else if (type === '?') {
      if (isSingle) {
        ans++;
      } else {
        const c = word.charCodeAt(0) - 97;
        possible &= ~(1 << c);
      }
    }
  }
  console.log(ans);
}

solve();
