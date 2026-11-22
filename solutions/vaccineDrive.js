const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const g = parseInt(input[ptr++], 10);
    const p = parseInt(input[ptr++], 10);
    const x = [];
    for (let i = 0; i < 10; i++) x.push(parseInt(input[ptr++], 10));
    let ahead = 0;
    for (let i = 9; i >= g; i--) ahead += x[i];
    const groupCount = x[g - 1];
    const minDay = Math.floor(ahead / p) + 1;
    const maxDay = Math.ceil((ahead + groupCount) / p);
    out.push(minDay + ' ' + maxDay);
  }
  console.log(out.join('\n'));
}
solve();