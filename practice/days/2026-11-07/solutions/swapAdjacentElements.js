const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 3 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(tokens[1 + i], 10);
  }
  const s = tokens[1 + n];

  let l = 0;
  while (l < n - 1) {
    if (s[l] === '1') {
      let r = l;
      while (r < n - 1 && s[r] === '1') r++;
      const sub = a.subarray(l, r + 1);
      sub.sort();
      l = r;
    } else {
      l++;
    }
  }

  let ok = true;
  for (let i = 0; i < n; i++) {
    if (a[i] !== i + 1) {
      ok = false;
      break;
    }
  }

  console.log(ok ? 'YES' : 'NO');
}

solve();
