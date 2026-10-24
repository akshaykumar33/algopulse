const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  const n = parseInt(input[0], 10);
  let minVal = Infinity;
  let maxVal = -Infinity;

  for (let i = 1; i <= n; i++) {
    const v = parseInt(input[i], 10);
    if (v < minVal) minVal = v;
    if (v > maxVal) maxVal = v;
  }

  let cntMin = 0n;
  let cntMax = 0n;

  for (let i = 1; i <= n; i++) {
    const v = parseInt(input[i], 10);
    if (v === minVal) cntMin++;
    if (v === maxVal) cntMax++;
  }

  if (minVal === maxVal) {
    const totalWays = (BigInt(n) * BigInt(n - 1)) / 2n;
    console.log(`0 ${totalWays}`);
  } else {
    const diff = maxVal - minVal;
    const ways = cntMin * cntMax;
    console.log(`${diff} ${ways}`);
  }
}

solve();
