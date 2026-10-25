const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const s = input[idx++];
    const count = {};
    let maxC = 0;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      count[ch] = (count[ch] || 0) + 1;
      if (count[ch] > maxC) maxC = count[ch];
    }
    if (maxC * 2 === s.length) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }
  console.log(out.join('\n'));
}

solve();
