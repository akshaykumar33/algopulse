const fs = require('fs');

function isPal(x) {
  let r = 0, t = x;
  while (t > 0) {
    r = r * 10 + (t % 10);
    t = Math.floor(t / 10);
  }
  return r === x;
}

const MAX = 100000;
const pref = new Int32Array(MAX + 1);
for (let i = 1; i <= MAX; i++) {
  pref[i] = pref[i - 1] + (isPal(i) ? i : 0);
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];
  for (let i = 0; i < t && idx < input.length; i++) {
    const l = parseInt(input[idx++], 10);
    const r = parseInt(input[idx++], 10);
    out.push(pref[r] - pref[l - 1]);
  }
  console.log(out.join('\n'));
}

solve();
