const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;

  const queries = new Int32Array(t);
  let maxN = 0;
  for (let i = 0; i < t; i++) {
    const n = nextInt();
    queries[i] = n;
    if (n > maxN) maxN = n;
  }

  if (maxN < 2) {
    const out = new Array(t).fill(0);
    console.log(out.join('\n'));
    return;
  }

  const isComposite = new Uint8Array(maxN + 1);
  const pi = new Int32Array(maxN + 1);
  let count = 0;
  for (let i = 2; i <= maxN; i++) {
    if (!isComposite[i]) {
      count++;
      for (let j = i * 2; j <= maxN; j += i) {
        isComposite[j] = 1;
      }
    }
    pi[i] = count;
  }

  const out = [];
  for (let i = 0; i < t; i++) {
    const n = queries[i];
    const half = n >> 1;
    let ans = 0;
    for (let g = 1; g <= half; g++) {
      ans += pi[(n / g) | 0];
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
