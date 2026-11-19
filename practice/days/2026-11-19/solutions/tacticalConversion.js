const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let l = 0;
    while (l < n && s[l] === '0') l++;
    let r = n - 1;
    while (r >= 0 && s[r] === '0') r--;
    if (l > r) {
      out.push('Yes');
      continue;
    }
    const len = r - l + 1;
    let allOnes = true;
    for (let i = l; i <= r; i++) {
      if (s[i] !== '1') {
        allOnes = false;
        break;
      }
    }
    if (allOnes && (len === 2 || len === 3)) {
      out.push('No');
    } else {
      out.push('Yes');
    }
  }

  console.log(out.join('\n'));
}

solve();
