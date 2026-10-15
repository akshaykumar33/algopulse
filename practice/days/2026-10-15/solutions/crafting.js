const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    for (let j = 0; j < n; j++) {
      a.push(parseInt(input[ptr++], 10));
    }
    const b = [];
    for (let j = 0; j < n; j++) {
      b.push(parseInt(input[ptr++], 10));
    }

    let cnt = 0;
    let diff = 0;
    let idx = -1;

    for (let j = 0; j < n; j++) {
      if (a[j] < b[j]) {
        cnt++;
        diff = b[j] - a[j];
        idx = j;
      }
    }

    if (cnt > 1) {
      out.push('NO');
    } else if (cnt === 0) {
      out.push('YES');
    } else {
      let ok = true;
      for (let j = 0; j < n; j++) {
        if (j === idx) continue;
        if (a[j] - diff < b[j]) {
          ok = false;
          break;
        }
      }
      out.push(ok ? 'YES' : 'NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
