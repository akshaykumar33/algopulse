const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    if (n === 3) {
      out.push('-1');
    } else {
      const res = [1, 3, 4, 2];
      for (let i = 5; i <= n; i++) {
        res.push(i);
      }
      out.push(res.join(' '));
    }
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
