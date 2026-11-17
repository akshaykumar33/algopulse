const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let idx = 0;
  const T = parseInt(input[idx++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    if (idx >= input.length) break;
    const parts = input[idx++].trim().split(/\s+/);
    if (parts.length < 2) continue;
    const n = parseInt(parts[0], 10);
    const k = parseInt(parts[1], 10);

    const hasBit = new Uint8Array(k);
    for (let i = 0; i < n; i++) {
      const s = input[idx++].trim();
      let ones = 0;
      let pos = -1;
      for (let j = 0; j < s.length; j++) {
        if (s[j] === '1') {
          ones++;
          pos = s.length - 1 - j;
        }
      }
      if (ones === 1 && pos >= 0 && pos < k) {
        hasBit[pos] = 1;
      }
    }

    let ok = true;
    for (let b = 0; b < k; b++) {
      if (!hasBit[b]) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
