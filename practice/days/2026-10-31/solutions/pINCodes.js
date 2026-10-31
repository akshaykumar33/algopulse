const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(tokens[ptr++]);
    }

    const seen = new Set();
    const usedAll = new Set(arr);
    let changes = 0;

    for (let i = 0; i < n; i++) {
      if (seen.has(arr[i])) {
        changes++;
        let found = false;
        for (let d = 0; d <= 9 && !found; d++) {
          const char = String.fromCharCode(48 + d);
          const cand = char + arr[i].slice(1);
          if (!usedAll.has(cand)) {
            arr[i] = cand;
            usedAll.add(cand);
            found = true;
          }
        }
      }
      seen.add(arr[i]);
    }

    out.push(changes.toString());
    for (let i = 0; i < n; i++) {
      out.push(arr[i]);
    }
  }

  console.log(out.join('\n'));
}

solve();
