const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = 32 - Math.clz32(n);
    out.push(k);
    const colors = [];
    for (let i = 1; i <= n; i++) {
      colors.push(32 - Math.clz32(i));
    }
    out.push(colors.join(' '));
  }
  console.log(out.join('\n'));
}
solve();