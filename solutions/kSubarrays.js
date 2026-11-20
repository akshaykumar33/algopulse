const fs = require('fs');
function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = [];
    let g = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      a.push(v);
      g = gcd(g, v);
    }
    let count = 0;
    let curG = 0;
    for (let i = 0; i < n; i++) {
      curG = gcd(curG, a[i]);
      if (curG === g) {
        count++;
        curG = 0;
      }
    }
    out.push(count >= k ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
solve();