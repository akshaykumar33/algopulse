const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let changes = 0;
    for (let i = 1; i < n; i++) {
      if (s[i] !== s[i - 1]) changes++;
    }

    if (changes < k) {
      out.push(-1);
      continue;
    }

    const targetColor = (k % 2 === 1) ? (s[0] === '0' ? '1' : '0') : s[0];
    let ans = -1;
    for (let i = n - 1; i >= 0; i--) {
      if (s[i] === targetColor) {
        ans = i + 1;
        break;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
