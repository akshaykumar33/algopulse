const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const t = parseInt(input[0], 10);
  const out = [];

  for (let i = 1; i <= t; i++) {
    const s = input[i];
    const seen = new Uint8Array(26);
    let count = 0;
    for (let j = 0; j < s.length; j++) {
      const idx = s.charCodeAt(j) - 97;
      if (!seen[idx]) {
        seen[idx] = 1;
        count++;
      }
    }
    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();
