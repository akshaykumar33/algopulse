const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let line = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(input[line++], 10);
    const s = input[line++].trim();
    let c = 0, n = 0;
    for (let i = 0; i < 14; i++) {
      if (s[i] === 'C') c += 2;
      else if (s[i] === 'N') n += 2;
      else { c += 1; n += 1; }
    }
    if (c > n) {
      out.push(60 * x);
    } else if (c < n) {
      out.push(40 * x);
    } else {
      out.push(55 * x);
    }
  }

  console.log(out.join('\n'));
}

solve();
