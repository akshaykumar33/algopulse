const fs = require('fs');

const MAX = 1000000;
const omega = new Int32Array(MAX + 1);
for (let i = 2; i <= MAX; i++) {
  if (omega[i] === 0) {
    for (let j = i; j <= MAX; j += i) {
      omega[j]++;
    }
  }
}

const pref = new Int32Array(MAX + 1);
for (let i = 1; i <= MAX; i++) {
  pref[i] = pref[i - 1] + omega[i];
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const ans = pref[m - 1] - pref[n - 1];
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
