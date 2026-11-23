const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    if (n === 1) {
      out.push('1');
    } else if (n === 3) {
      out.push('5 6 3');
    } else if (n === 5) {
      out.push('7 5 7 7 3');
    } else {
      const arr = new Array(n - 1).fill(3);
      arr.push(1);
      out.push(arr.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
