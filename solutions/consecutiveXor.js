const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let xorSum = 0;
    for (let i = 0; i < n; i++) {
      xorSum ^= parseInt(input[ptr++], 10);
    }
    if (n % 2 === 1) {
      out.push("YES");
    } else {
      out.push(xorSum === 0 ? "YES" : "NO");
    }
  }
  console.log(out.join('\n'));
}

solve();
