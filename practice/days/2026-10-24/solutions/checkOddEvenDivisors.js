const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let a = parseInt(input[ptr++], 10);
    let b = parseInt(input[ptr++], 10);
    if (a > 0 && b % a === 0) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }
  console.log(out.join('\n'));
}

solve();
