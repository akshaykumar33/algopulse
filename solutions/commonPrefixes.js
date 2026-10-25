const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(input[ptr++], 10));
    }

    const chars = new Array(100).fill('a');
    out.push(chars.join(''));

    for (let i = 0; i < n; i++) {
      const idx = a[i];
      chars[idx] = chars[idx] === 'a' ? 'b' : 'a';
      out.push(chars.join(''));
    }
  }

  console.log(out.join('\n'));
}

solve();
