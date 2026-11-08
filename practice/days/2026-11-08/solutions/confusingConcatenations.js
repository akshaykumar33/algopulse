const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    let splitIdx = -1;
    for (let i = 1; i < n; i++) {
      if (arr[i] > arr[0]) {
        splitIdx = i;
        break;
      }
    }

    if (splitIdx === -1) {
      out.push('-1');
    } else {
      out.push(splitIdx);
      const a = [];
      for (let i = 0; i < splitIdx; i++) {
        a.push(arr[i]);
      }
      out.push(a.join(' '));

      out.push(n - splitIdx);
      const b = [];
      for (let i = splitIdx; i < n; i++) {
        b.push(arr[i]);
      }
      out.push(b.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
