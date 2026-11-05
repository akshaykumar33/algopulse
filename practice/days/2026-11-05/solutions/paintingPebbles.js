const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);
  const a = [];
  let minVal = Infinity;
  let maxVal = -Infinity;
  for (let i = 0; i < n; i++) {
    const val = parseInt(tokens[ptr++], 10);
    a.push(val);
    if (val < minVal) minVal = val;
    if (val > maxVal) maxVal = val;
  }
  if (maxVal - minVal > k) {
    console.log('NO');
    return;
  }
  const out = ['YES'];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < a[i]; j++) {
      row.push((j % k) + 1);
    }
    out.push(row.join(' '));
  }
  console.log(out.join('\n'));
}
solve();
