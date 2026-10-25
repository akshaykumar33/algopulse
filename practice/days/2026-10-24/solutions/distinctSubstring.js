const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let k = parseInt(input[ptr++], 10);
    let minLen = (k * (k + 1)) / 2 + (k - 1);
    out.push(n >= minLen ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
