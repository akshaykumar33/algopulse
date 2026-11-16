const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
  a.sort();

  const used = new Uint8Array(150005);
  let ans = 0;

  for (let i = 0; i < n; i++) {
    const x = a[i];
    if (x - 1 >= 1 && !used[x - 1]) {
      used[x - 1] = 1;
      ans++;
    } else if (!used[x]) {
      used[x] = 1;
      ans++;
    } else if (!used[x + 1]) {
      used[x + 1] = 1;
      ans++;
    }
  }
  console.log(ans);
}

solve();
