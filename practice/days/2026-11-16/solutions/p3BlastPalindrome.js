const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    if (n % 3 === 1) {
      out.push("YES");
      continue;
    }
    let ok = false;
    for (let code = 97; code <= 122; code++) {
      const ch = String.fromCharCode(code);
      let first = -1;
      for (let i = 0; i < n; i++) {
        if (s[i] === ch && i % 3 === 0) {
          first = i;
          break;
        }
      }
      let last = -1;
      for (let j = n - 1; j >= 0; j--) {
        if (s[j] === ch && (n - 1 - j) % 3 === 0) {
          last = j;
          break;
        }
      }
      if (first !== -1 && last !== -1 && first < last) {
        ok = true;
        break;
      }
    }
    out.push(ok ? "YES" : "NO");
  }
  console.log(out.join('\n'));
}

solve();
