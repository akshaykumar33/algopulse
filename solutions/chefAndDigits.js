const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const s = input[ptr++];

  const cnt = new Int32Array(10);
  const ans = new Int32Array(n + 1);

  for (let i = 0; i < n; i++) {
    const d = s.charCodeAt(i) - 48;
    let sum = 0;
    for (let digit = 0; digit < 10; digit++) {
      if (cnt[digit] > 0) {
        sum += cnt[digit] * Math.abs(d - digit);
      }
    }
    ans[i + 1] = sum;
    cnt[d]++;
  }

  const out = [];
  for (let i = 0; i < m; i++) {
    const x = parseInt(input[ptr++], 10);
    out.push(ans[x]);
  }

  console.log(out.join('\n'));
}

solve();
