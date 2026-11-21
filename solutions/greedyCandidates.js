const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const minSalary = new Array(n);
    for (let i = 0; i < n; i++) minSalary[i] = BigInt(input[ptr++]);
    const offeredSalary = new Array(m);
    const maxJobOffer = new Array(m);
    for (let j = 0; j < m; j++) {
      offeredSalary[j] = BigInt(input[ptr++]);
      maxJobOffer[j] = parseInt(input[ptr++], 10);
    }
    const qual = new Array(n);
    for (let i = 0; i < n; i++) qual[i] = input[ptr++];

    let placed = 0;
    let totalSal = 0n;
    const hired = new Uint8Array(m);

    for (let i = 0; i < n; i++) {
      let bestCompany = -1;
      let maxSal = -1n;
      const str = qual[i];
      for (let j = 0; j < m; j++) {
        if (str[j] === '1' && offeredSalary[j] >= minSalary[i]) {
          if (offeredSalary[j] > maxSal && maxJobOffer[j] > 0) {
            maxSal = offeredSalary[j];
            bestCompany = j;
          }
        }
      }
      if (bestCompany !== -1) {
        placed++;
        totalSal += maxSal;
        maxJobOffer[bestCompany]--;
        hired[bestCompany] = 1;
      }
    }
    let zeroHired = 0;
    for (let j = 0; j < m; j++) if (!hired[j]) zeroHired++;
    out.push(placed + ' ' + totalSal.toString() + ' ' + zeroHired);
  }
  console.log(out.join('\n'));
}
solve();