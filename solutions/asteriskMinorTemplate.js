const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return;
  let idx = 0;
  const t = parseInt(lines[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = lines[idx++];
    const b = lines[idx++];

    if (a[0] === b[0]) {
      out.push('YES');
      out.push(a[0] + '*');
      continue;
    }

    if (a[a.length - 1] === b[b.length - 1]) {
      out.push('YES');
      out.push('*' + a[a.length - 1]);
      continue;
    }

    let found = null;
    for (let i = 0; i < a.length - 1; i++) {
      const sub = a.slice(i, i + 2);
      if (b.includes(sub)) {
        found = sub;
        break;
      }
    }

    if (found) {
      out.push('YES');
      out.push('*' + found + '*');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
