const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const s = tokens[0];
  const n = s.length;
  const pi = new Int32Array(n);

  for (let i = 1; i < n; i++) {
    let j = pi[i - 1];
    const code = s.charCodeAt(i);
    while (j > 0 && code !== s.charCodeAt(j)) {
      j = pi[j - 1];
    }
    if (code === s.charCodeAt(j)) j++;
    pi[i] = j;
  }

  let k = pi[n - 1];
  const half = Math.floor(n / 2);
  while (k > half) {
    k = pi[k - 1];
  }

  console.log(k);
}

solve();
