const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const x = parseInt(tokens[ptr++], 10);
  const y = parseInt(tokens[ptr++], 10);

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
  const b = new Int32Array(m);
  for (let j = 0; j < m; j++) b[j] = parseInt(tokens[ptr++], 10);

  let i = 0;
  let j = 0;
  const matches = [];

  while (i < n && j < m) {
    if (b[j] < a[i] - x) {
      j++;
    } else if (b[j] > a[i] + y) {
      i++;
    } else {
      matches.push((i + 1) + ' ' + (j + 1));
      i++;
      j++;
    }
  }

  const out = [matches.length, ...matches];
  console.log(out.join('\n'));
}

solve();
