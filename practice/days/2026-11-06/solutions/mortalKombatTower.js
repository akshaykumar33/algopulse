const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
    }

    const dp0 = new Int32Array(n + 3);
    const dp1 = new Int32Array(n + 3);

    for (let i = n - 1; i >= 0; i--) {
      let opt1 = a[i] + dp1[i + 1];
      let opt2 = 1e9;
      if (i + 1 < n) {
        opt2 = a[i] + a[i + 1] + dp1[i + 2];
      }
      dp0[i] = Math.min(opt1, opt2);

      let myOpt1 = dp0[i + 1];
      let myOpt2 = 1e9;
      if (i + 1 < n) {
        myOpt2 = dp0[i + 2];
      }
      dp1[i] = Math.min(myOpt1, myOpt2);
    }

    out.push(dp0[0]);
  }

  console.log(out.join('\n'));
}

solve();

