const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const origN = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    let n = origN;
    while (true) {
      const s = n.toString();
      const idx = s.indexOf(d.toString());
      if (idx === -1) break;
      const rem = s.length - 1 - idx;
      const base = Math.pow(10, rem);
      n = (Math.floor(n / base) + 1) * base;
    }
    out.push(n - origN);
  }
  console.log(out.join('\n'));
}
solve();