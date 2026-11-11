const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  let degA = new Int32Array(200005);
  let degB = new Int32Array(200005);

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    if (a >= degA.length) degA = new Int32Array(a + 5);
    if (b >= degB.length) degB = new Int32Array(b + 5);

    const u = new Int32Array(k);
    const v = new Int32Array(k);

    for (let i = 0; i < k; i++) {
      u[i] = parseInt(tokens[ptr++], 10);
      degA[u[i]]++;
    }
    for (let i = 0; i < k; i++) {
      v[i] = parseInt(tokens[ptr++], 10);
      degB[v[i]]++;
    }

    let ans = 0;
    for (let i = 0; i < k; i++) {
      ans += k - (degA[u[i]] + degB[v[i]] - 1);
    }

    for (let i = 0; i < k; i++) {
      degA[u[i]] = 0;
      degB[v[i]] = 0;
    }

    out.push(ans / 2);
  }

  console.log(out.join('\n'));
}

solve();
