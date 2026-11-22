const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    if (n % 2 !== 0) {
      out.push('NO');
      continue;
    }
    let z = 0, o = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') z++;
      else o++;
    }
    if (z === o) {
      out.push('YES\n1 ' + n);
      continue;
    }
    const target = (n / 2) - z;
    const prefPos = new Map();
    prefPos.set(0, 0);
    let cur = 0;
    let foundL = -1, foundR = -1;
    for (let i = 0; i < n; i++) {
      cur += (s[i] === '1' ? 1 : -1);
      if (prefPos.has(cur - target)) {
        foundL = prefPos.get(cur - target) + 1;
        foundR = i + 1;
        break;
      }
      if (!prefPos.has(cur)) prefPos.set(cur, i + 1);
    }
    if (foundL !== -1) {
      out.push('YES\n' + foundL + ' ' + foundR);
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}
solve();