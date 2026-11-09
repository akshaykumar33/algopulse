const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let o = 0;
    let c = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '(') o++;
      else c++;
    }

    if (o !== c) {
      out.push('-1');
      continue;
    }

    const col = new Int32Array(n);
    let bal = 0;
    let has1 = false;
    let has2 = false;

    for (let i = 0; i < n; i++) {
      if (bal > 0 || (bal === 0 && s[i] === '(')) {
        col[i] = 1;
        has1 = true;
      } else {
        col[i] = 2;
        has2 = true;
      }
      bal += s[i] === '(' ? 1 : -1;
    }

    if (!has1 || !has2) {
      out.push('1');
      const ones = new Array(n).fill(1);
      out.push(ones.join(' '));
    } else {
      out.push('2');
      out.push(col.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
