const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  const target = 'hello';
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === target[j]) {
      j++;
      if (j === target.length) break;
    }
  }
  console.log(j === target.length ? 'YES' : 'NO');
}

solve();
