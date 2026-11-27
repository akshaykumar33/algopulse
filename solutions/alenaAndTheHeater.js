const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
  const b = tokens[ptr++];
  let l = -1000000000;
  let r = 1000000000;
  for (let i = 4; i < n; i++) {
    if (b[i] === '1' && b[i - 1] === '0') {
      let mx = a[i];
      for (let j = 1; j <= 4; j++) if (a[i - j] > mx) mx = a[i - j];
      if (mx + 1 > l) l = mx + 1;
    } else if (b[i] === '0' && b[i - 1] === '1') {
      let mn = a[i];
      for (let j = 1; j <= 4; j++) if (a[i - j] < mn) mn = a[i - j];
      if (mn - 1 < r) r = mn - 1;
    }
  }
  console.log(l + ' ' + r);
}
