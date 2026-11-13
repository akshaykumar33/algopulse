const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const x = Number(input[ptr++]);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = Number(input[ptr++]);
    }
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = Number(input[ptr++]);
    }
    const mx = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      mx[i] = a[i];
    }
    for (let i = n - 2; i >= 0; i--) {
      if (mx[i + 1] > mx[i]) {
        mx[i] = mx[i + 1];
      }
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
      if (x - ans >= b[i] && x - ans - 1 >= mx[i + 1]) {
        ans++;
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
