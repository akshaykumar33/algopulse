const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];
  for (let i = 0; i < t && idx < input.length; i++) {
    const n = parseInt(input[idx++], 10);
    const a = [];
    for (let j = 0; j < n; j++) {
      a.push(parseInt(input[idx++], 10));
    }
    a.sort((x, y) => x - y);
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      if (cnt >= a[j]) {
        cnt++;
      } else {
        break;
      }
    }
    out.push(cnt);
  }
  console.log(out.join('\n'));
}

solve();
