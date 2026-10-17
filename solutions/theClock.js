const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const s = input[ptr++];
    const x = parseInt(input[ptr++], 10);
    const h0 = parseInt(s.substring(0, 2), 10);
    const m0 = parseInt(s.substring(3, 5), 10);
    let cur = h0 * 60 + m0;
    const start = cur;
    let ans = 0;
    while (true) {
      const h = Math.floor(cur / 60);
      const m = cur % 60;
      if (Math.floor(h / 10) === m % 10 && (h % 10) === Math.floor(m / 10)) {
        ans++;
      }
      cur = (cur + x) % 1440;
      if (cur === start) break;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
