const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const q = parseInt(tokens[ptr++], 10);

  const t = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    t[i] = parseInt(tokens[ptr++], 10);
  }

  const screen = [];
  const out = [];

  for (let i = 0; i < q; i++) {
    const type = parseInt(tokens[ptr++], 10);
    const id = parseInt(tokens[ptr++], 10);

    if (type === 1) {
      if (screen.length < k) {
        screen.push(id);
      } else {
        let minIdx = 0;
        for (let j = 1; j < screen.length; j++) {
          if (t[screen[j]] < t[screen[minIdx]]) {
            minIdx = j;
          }
        }
        if (t[id] > t[screen[minIdx]]) {
          screen[minIdx] = id;
        }
      }
    } else {
      let found = false;
      for (let j = 0; j < screen.length; j++) {
        if (screen[j] === id) {
          found = true;
          break;
        }
      }
      out.push(found ? 'YES' : 'NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
