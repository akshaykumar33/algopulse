const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const a = input[ptr++];
    if (n === 1) {
      out.push(a[0] === '1' ? '1' : '0');
    } else {
      let sum = 0;
      sum += (a[0] === '1' ? 2 : 0);
      sum += (a[n - 1] === '1' ? 2 : 0);
      for (let i = 1; i < n - 1; i++) {
        if (a[i] === '1') sum += 3;
      }
      out.push(sum.toString());
    }
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
