const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  const b = new Int32Array(m);
  for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
  for (let i = 0; i < m; i++) b[i] = parseInt(tokens[ptr++], 10);
  a.sort((x, y) => y - x);
  b.sort((x, y) => y - x);
  let win = false;
  if (n > m) win = true;
  else {
    for (let i = 0; i < n; i++) {
      if (a[i] > b[i]) {
        win = true;
        break;
      }
    }
  }
  console.log(win ? 'YES' : 'NO');
}
