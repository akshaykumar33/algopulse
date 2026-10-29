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

    let ans = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') continue;
      if (i > 0 && s[i - 1] === '1') continue;
      if (i + 1 < n && s[i + 1] === '1') continue;
      ans++;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
