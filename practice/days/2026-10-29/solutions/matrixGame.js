const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const total = n * m;
    const a = new Int32Array(total);
    for (let i = 0; i < total; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }
    a.sort();

    let cyborg = 0;
    let geno = 0;
    let turn = 0;
    for (let i = total - 1; i >= 0; i--) {
      if ((turn & 1) === 0) {
        cyborg += a[i];
      } else {
        geno += a[i];
      }
      turn++;
    }

    if (cyborg > geno) {
      out.push('Cyborg');
    } else if (geno > cyborg) {
      out.push('Geno');
    } else {
      out.push('Draw');
    }
  }
  console.log(out.join('\n'));
}

solve();
