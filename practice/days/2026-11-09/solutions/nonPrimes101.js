const fs = require('fs');

const isPrime = new Uint8Array(205);
for (let i = 2; i <= 200; i++) isPrime[i] = 1;
for (let i = 2; i * i <= 200; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= 200; j += i) isPrime[j] = 0;
  }
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  const pos1 = new Int32Array(101);
  const pos2 = new Int32Array(101);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const vals = [];

    for (let i = 1; i <= n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (pos1[v] === 0) {
        pos1[v] = i;
        vals.push(v);
      } else if (pos2[v] === 0) {
        pos2[v] = i;
      }
    }

    let a = -1;
    let b = -1;

    for (let i = 0; i < vals.length; i++) {
      const v1 = vals[i];
      if (pos2[v1] !== 0 && isPrime[v1 + v1] === 0) {
        a = pos1[v1];
        b = pos2[v1];
        break;
      }
      for (let j = i + 1; j < vals.length; j++) {
        const v2 = vals[j];
        if (isPrime[v1 + v2] === 0) {
          a = pos1[v1];
          b = pos1[v2];
          break;
        }
      }
      if (a !== -1) break;
    }

    for (let i = 0; i < vals.length; i++) {
      const v = vals[i];
      pos1[v] = 0;
      pos2[v] = 0;
    }

    if (a !== -1) {
      out.push(a + ' ' + b);
    } else {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();
