const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    
    let m = 0;
    const half = Math.floor(n / 2);
    for (let i = 0; i < half; i++) {
      if (s[i] !== s[n - 1 - i]) {
        m++;
      }
    }

    const ans = new Array(n + 1);
    const isOdd = (n % 2 !== 0);
    for (let k = 0; k <= n; k++) {
      if (k >= m && k <= n - m && (isOdd || (k - m) % 2 === 0)) {
        ans[k] = '1';
      } else {
        ans[k] = '0';
      }
    }
    out.push(ans.join(''));
  }

  console.log(out.join('\n'));
}

solve();
