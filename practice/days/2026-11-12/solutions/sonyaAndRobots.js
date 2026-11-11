const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const arr = new Int32Array(n);
  const first = new Int32Array(100005);
  first.fill(-1);

  for (let i = 0; i < n; i++) {
    const v = parseInt(tokens[ptr++], 10);
    arr[i] = v;
    if (first[v] === -1) {
      first[v] = i;
    }
  }

  const seen = new Uint8Array(100005);
  let distinctRight = 0;
  let ans = 0;

  for (let i = n - 1; i >= 0; i--) {
    const v = arr[i];
    if (first[v] === i) {
      ans += distinctRight;
    }
    if (seen[v] === 0) {
      seen[v] = 1;
      distinctRight++;
    }
  }

  console.log(ans);
}

solve();
