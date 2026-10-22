const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];

  for (let tc = 1; tc <= t; tc++) {
    const s = input[tc].trim().split('').sort();
    let power = 0;
    for (let j = 0; j < s.length; j++) {
      const val = s[j].charCodeAt(0) - 96;
      power += val * (j + 1);
    }
    out.push(power);
  }

  console.log(out.join('\n'));
}

solve();
