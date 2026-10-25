const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const parts = input[lineIdx++].trim().split(/\s+/);
    const n = parseInt(parts[0], 10);
    const c = parts[1];
    const s = input[lineIdx++].trim();

    let allSame = true;
    for (let i = 0; i < n; i++) {
      if (s[i] !== c) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      out.push(0);
      continue;
    }

    let foundX = -1;
    for (let x = n; x >= 1; x--) {
      let ok = true;
      for (let k = x; k <= n; k += x) {
        if (s[k - 1] !== c) {
          ok = false;
          break;
        }
      }
      if (ok) {
        foundX = x;
        break;
      }
    }

    if (foundX !== -1) {
      out.push(1);
      out.push(foundX);
    } else {
      out.push(2);
      out.push(`${n} ${n - 1}`);
    }
  }

  console.log(out.join('\n'));
}

solve();
