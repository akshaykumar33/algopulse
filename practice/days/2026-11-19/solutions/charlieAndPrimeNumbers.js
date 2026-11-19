const fs = require('fs');

const MAX = 5000001;
const isComposite = new Uint8Array(MAX);
isComposite[0] = 1;
isComposite[1] = 1;
for (let p = 2; p * p < MAX; p++) {
  if (!isComposite[p]) {
    for (let i = p * p; i < MAX; i += p) {
      isComposite[i] = 1;
    }
  }
}

const pref = new BigInt64Array(MAX);
let sum = 0n;
for (let i = 2; i < MAX; i++) {
  if (!isComposite[i]) sum += BigInt(i);
  pref[i] = sum;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const m = parseInt(input[ptr++], 10);
    const n = parseInt(input[ptr++], 10);
    if (m > n) {
      out.push('0');
    } else {
      const ans = pref[n] - (m > 0 ? pref[m - 1] : 0n);
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
