const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const x = Number(input[ptr++]) - 1;
    const y = Number(input[ptr++]) - 1;

    const a = new Int32Array(n);
    a[x] = 0;
    a[y] = 1;

    const p1 = [];
    let cur = (x + 1) % n;
    while (cur !== y) {
      p1.push(cur);
      cur = (cur + 1) % n;
    }

    const p2 = [];
    cur = (y + 1) % n;
    while (cur !== x) {
      p2.push(cur);
      cur = (cur + 1) % n;
    }

    function colorPath(path, startVal) {
      const len = path.length + 1;
      if (len % 2 === 1) {
        for (let i = 0; i < path.length; i++) {
          a[path[i]] = (startVal + 1 + i) % 2;
        }
      } else {
        for (let i = 0; i < path.length - 1; i++) {
          a[path[i]] = (startVal + 1 + i) % 2;
        }
        a[path[path.length - 1]] = 2;
      }
    }

    colorPath(p1, 0);
    colorPath(p2, 1);

    out.push(a.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
