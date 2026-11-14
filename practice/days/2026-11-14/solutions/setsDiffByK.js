const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = [];
    for (let i = 1; i <= n; i++) {
      if (parseInt(input[ptr++], 10) === 1) s.push(i);
    }

    if (s.length === 0) {
      out.push('No');
      continue;
    }

    let valid = true;
    for (let i = 0; i < s.length - 1; i++) {
      if (s[i + 1] - s[i] <= k) {
        valid = false;
        break;
      }
    }

    if (!valid) {
      out.push('No');
      continue;
    }

    let covered = true;
    for (let i = 1; i <= n; i++) {
      let hasNear = false;
      for (let j = 0; j < s.length; j++) {
        if (Math.abs(s[j] - i) <= k) {
          hasNear = true;
          break;
        }
      }
      if (!hasNear) {
        covered = false;
        break;
      }
    }

    out.push(covered ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
}

solve();
