const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let tc = 1; tc <= t; tc++) {
    let n = BigInt(input[tc]);
    while (true) {
      let s = n.toString();
      let mask = 0;
      for (let i = 0; i < s.length; i++) {
        let d = s.charCodeAt(i) - 48;
        if (d > 1) mask |= (1 << d);
      }
      let ok = true;
      for (let d = 2; d <= 9; d++) {
        if ((mask & (1 << d)) !== 0 && n % BigInt(d) !== 0n) {
          ok = false;
          break;
        }
      }
      if (ok) {
        out.push(s);
        break;
      }
      n++;
    }
  }
  console.log(out.join('\n'));
}

solve();
