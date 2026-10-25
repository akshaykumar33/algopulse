const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const s = input[idx++];
    let pairs = 0;
    let i = 0;
    while (i < s.length - 1) {
      if ((s[i] === 'x' && s[i + 1] === 'y') || (s[i] === 'y' && s[i + 1] === 'x')) {
        pairs++;
        i += 2;
      } else {
        i++;
      }
    }
    out.push(pairs);
  }
  console.log(out.join('\n'));
}

solve();
