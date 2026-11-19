const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const msbCount = new Int32Array(32);
    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (val > 0) {
        const msb = 31 - Math.clz32(val);
        msbCount[msb]++;
      }
    }
    let ans = 0;
    for (let b = 0; b < 32; b++) {
      const c = msbCount[b];
      if (c > 1) {
        ans += (c * (c - 1)) / 2;
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
