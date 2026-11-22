const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let tc = 1; tc <= t; tc++) {
    const s = input[tc];
    let aStr = '', bStr = '';
    for (let i = 0; i < s.length; i++) {
      if (i % 2 === 0) aStr += s[i];
      else bStr += s[i];
    }
    const a = BigInt(aStr || '0');
    const b = BigInt(bStr || '0');
    const ans = (a + 1n) * (b + 1n) - 2n;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();