const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const u = [];
  for (let i = 0; i < n; i++) u.push(parseInt(input[1 + i], 10));

  const count = new Int32Array(100005);
  const freqCount = new Int32Array(100005);
  let distinctColors = 0;
  let maxFreq = 0;
  let ans = 1;

  for (let i = 0; i < n; i++) {
    const val = u[i];
    const prevFreq = count[val];
    if (prevFreq > 0) freqCount[prevFreq]--;
    else distinctColors++;

    count[val]++;
    const newFreq = count[val];
    freqCount[newFreq]++;
    if (newFreq > maxFreq) maxFreq = newFreq;

    const len = i + 1;
    let ok = false;

    if (maxFreq === 1) ok = true;
    else if (distinctColors === 1) ok = true;
    else if (freqCount[1] === 1 && freqCount[maxFreq] * maxFreq === len - 1) ok = true;
    else if (freqCount[maxFreq] === 1 && freqCount[maxFreq - 1] * (maxFreq - 1) + maxFreq === len) ok = true;

    if (ok) ans = len;
  }

  console.log(ans);
}

solve();
