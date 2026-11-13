const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const b = Number(input[ptr++]);
    let cur = -1;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      const x = Number(input[ptr++]);
      if ((x & b) === b) {
        if (cnt === 0) {
          cur = x;
        } else {
          cur = cur & x;
        }
        cnt++;
      }
    }
    if (cnt > 0 && cur === b) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
