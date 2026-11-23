const fs = require('fs');

const MAX = 1000000;
const spf = new Int32Array(MAX + 1);
const primes = [];
for (let i = 2; i <= MAX; i++) {
  if (spf[i] === 0) {
    spf[i] = i;
    primes.push(i);
  }
  for (let j = 0; j < primes.length && primes[j] <= spf[i] && i * primes[j] <= MAX; j++) {
    spf[i * primes[j]] = primes[j];
  }
}

const pSum = new Float64Array(MAX + 1);
let curSum = 0;
for (let i = 2; i <= MAX; i++) {
  if (spf[i] === i) curSum += i;
  pSum[i] = curSum;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const k = parseInt(input[ptr++], 10);
    const p = spf[k];
    const sumP = BigInt(pSum[p]);
    const ans = BigInt(k) * sumP;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
