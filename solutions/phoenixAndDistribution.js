const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || !input[0]) return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const k = parseInt(input[idx++], 10);
    const s = input[idx++].split('').sort();
    if (s[0] !== s[k - 1]) {
      out.push(s[k - 1]);
    } else if (k < n && s[k] === s[n - 1]) {
      const count = Math.ceil((n - k) / k);
      out.push(s[0] + s[k].repeat(count));
    } else {
      out.push(s[0] + s.slice(k).join(''));
    }
  }
  console.log(out.join('\n'));
}

solve();
