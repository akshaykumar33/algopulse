const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = BigInt(input[ptr++]);
  const m = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const x = BigInt(input[ptr++]);
  const s = BigInt(input[ptr++]);

  const a = new BigInt64Array(m + 1);
  const b = new BigInt64Array(m + 1);
  a[0] = x;
  b[0] = 0n;
  for (let i = 1; i <= m; i++) a[i] = BigInt(input[ptr++]);
  for (let i = 1; i <= m; i++) b[i] = BigInt(input[ptr++]);

  const c = new BigInt64Array(k);
  const d = new BigInt64Array(k);
  for (let i = 0; i < k; i++) c[i] = BigInt(input[ptr++]);
  for (let i = 0; i < k; i++) d[i] = BigInt(input[ptr++]);

  let minTime = n * x;

  for (let i = 0; i <= m; i++) {
    const cost1 = b[i];
    if (cost1 > s) continue;
    const remMana = s - cost1;

    let left = 0;
    let right = k - 1;
    let bestK = -1;
    while (left <= right) {
      const mid = (left + right) >> 1;
      if (d[mid] <= remMana) {
        bestK = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    let instant = 0n;
    if (bestK !== -1) {
      instant = c[bestK];
    }

    const remPotions = n > instant ? n - instant : 0n;
    const totalTime = remPotions * a[i];
    if (totalTime < minTime) {
      minTime = totalTime;
    }
  }

  console.log(minTime.toString());
}

solve();
