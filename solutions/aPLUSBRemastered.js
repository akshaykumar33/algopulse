const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));
    let b = [];
    for (let i = 0; i < n; i++) b.push(parseInt(input[ptr++], 10));

    a.sort((x, y) => x - y);
    b.sort((x, y) => y - x);

    let sum = a[0] + b[0];
    let ok = true;
    for (let i = 1; i < n; i++) {
      if (a[i] + b[i] !== sum) {
        ok = false;
        break;
      }
    }

    if (!ok) {
      out.push("-1");
    } else {
      out.push(a.join(' '));
      out.push(b.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
