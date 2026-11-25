const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const T = parseInt(data[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(data[ptr++], 10);
    const s = data[ptr++];
    const pref = new Int32Array(n);
    let run = 0;
    for (let i = 0; i < n; i++) {
      run += s.charCodeAt(i) - 48;
      pref[i] = run;
    }
    const res = [];
    let carry = 0;
    for (let i = n - 1; i >= 0; i--) {
      const val = pref[i] + carry;
      res.push(val % 10);
      carry = Math.floor(val / 10);
    }
    while (carry > 0) {
      res.push(carry % 10);
      carry = Math.floor(carry / 10);
    }
    while (res.length > 1 && res[res.length - 1] === 0) res.pop();
    res.reverse();
    out.push(res.join(''));
  }
  console.log(out.join('\n'));
}

solve();
