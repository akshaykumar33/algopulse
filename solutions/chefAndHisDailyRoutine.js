const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let s = input[ptr++];
    let ok = true;
    for (let i = 0; i < s.length - 1; i++) {
      let a = s[i], b = s[i + 1];
      if (a === 'E' && b === 'C') { ok = false; break; }
      if (a === 'S' && (b === 'C' || b === 'E')) { ok = false; break; }
    }
    out.push(ok ? 'yes' : 'no');
  }
  console.log(out.join('\n'));
}

solve();
