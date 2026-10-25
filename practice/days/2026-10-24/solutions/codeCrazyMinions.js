const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let s = input[ptr++];
    let instructions = 2; // 1 load + 1 print for first char
    for (let i = 1; i < s.length; i++) {
      let diff = (s.charCodeAt(i) - s.charCodeAt(i - 1) + 26) % 26;
      instructions += diff + 1; // diff increments + 1 print
    }
    if (instructions <= 11 * s.length) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
