const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const b = parseInt(input, 10);

  let cnt = 0;
  for (let i = 1; i * i <= b; i++) {
    if (b % i === 0) {
      cnt++;
      if (i * i !== b) {
        cnt++;
      }
    }
  }

  console.log(cnt);
}

solve();

