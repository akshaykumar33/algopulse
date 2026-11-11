const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  let arr = new Int32Array(300005);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n > arr.length) arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    let sufMax = arr[n - 1];
    let sufIdx = n - 1;
    let ans = 0;

    for (let i = n - 2; i >= 0; i--) {
      if (arr[i] >= sufMax) {
        sufMax = arr[i];
        sufIdx = i;
      } else {
        const d = sufIdx - i;
        if (d > ans) ans = d;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
