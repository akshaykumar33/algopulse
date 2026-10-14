const fs = require('fs');

const solve = () => {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const p = input[ptr++];
    const h = input[ptr++];

    if (p.length > h.length) {
      out.push('NO');
      continue;
    }

    const target = p.split('').sort().join('');
    let ok = false;
    const len = p.length;

    for (let i = 0; i <= h.length - len; i++) {
      const sub = h.slice(i, i + len).split('').sort().join('');
      if (sub === target) {
        ok = true;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
};

solve();
