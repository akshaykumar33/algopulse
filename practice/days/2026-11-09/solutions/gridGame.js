const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const s = input.split(/\s+/)[0];
  let c = 0;
  let r = 0;
  const out = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') {
      if (c === 0) {
        out.push('1 1');
        c = 1;
      } else {
        out.push('3 1');
        c = 0;
      }
    } else {
      if (r === 0) {
        out.push('4 3');
        r = 1;
      } else {
        out.push('4 1');
        r = 0;
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
