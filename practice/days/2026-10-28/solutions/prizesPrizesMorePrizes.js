const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const p = [];
  for (let i = 0; i < n; i++) {
    p.push(BigInt(input[ptr++]));
  }
  const cost = [];
  for (let i = 0; i < 5; i++) {
    cost.push(BigInt(input[ptr++]));
  }

  const cnt = [0n, 0n, 0n, 0n, 0n];
  let pts = 0n;

  for (let i = 0; i < n; i++) {
    pts += p[i];
    for (let j = 4; j >= 0; j--) {
      if (pts >= cost[j]) {
        const k = pts / cost[j];
        cnt[j] += k;
        pts %= cost[j];
      }
    }
  }

  console.log(cnt.map(String).join(' '));
  console.log(pts.toString());
}

solve();

