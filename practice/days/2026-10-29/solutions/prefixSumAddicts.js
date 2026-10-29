const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const s = new Array(k);
    for (let i = 0; i < k; i++) {
      s[i] = BigInt(input[ptr++]);
    }

    if (k === 1) {
      out.push('YES');
      continue;
    }

    const a = new Array(k);
    for (let i = 1; i < k; i++) {
      a[i] = s[i] - s[i - 1];
    }

    let ok = true;
    for (let i = 2; i < k; i++) {
      if (a[i] < a[i - 1]) {
        ok = false;
        break;
      }
    }

    if (!ok) {
      out.push('NO');
      continue;
    }

    const count = BigInt(n - k + 1);
    if (s[0] > count * a[1]) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }

  console.log(out.join('\n'));
}

solve();

