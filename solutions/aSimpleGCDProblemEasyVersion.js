const fs = require('fs');

function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    for (let i = 0; i < n; i++) {
      ptr++;
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
      let req;
      if (i === 0) {
        req = gcd(a[0], a[1]);
      } else if (i === n - 1) {
        req = gcd(a[n - 2], a[n - 1]);
      } else {
        const gL = gcd(a[i - 1], a[i]);
        const gR = gcd(a[i], a[i + 1]);
        const gLR = gcd(gL, gR);
        const lcmVal = (BigInt(gL) * BigInt(gR)) / BigInt(gLR);
        req = lcmVal <= BigInt(a[i]) ? Number(lcmVal) : a[i];
      }

      if (req < a[i]) {
        ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
