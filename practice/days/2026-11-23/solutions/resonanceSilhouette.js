const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let bBudget = BigInt(input[ptr++]);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));
    const sStr = input[ptr++];
    const s = sStr.split('').map(Number);
    const c = [];
    for (let i = 0; i < n - 1; i++) c.push(BigInt(input[ptr++]));
    const valleys = [];
    let i = 0;
    while (i < n - 1) {
      if (a[i] > a[i + 1]) {
        let lastDec = i;
        while (lastDec + 1 < n - 1 && a[lastDec + 1] > a[lastDec + 2]) {
          lastDec++;
        }
        let firstInc = lastDec + 1;
        while (firstInc < n - 1 && a[firstInc] === a[firstInc + 1]) {
          firstInc++;
        }
        if (firstInc < n - 1 && a[firstInc] < a[firstInc + 1]) {
          valleys.push([lastDec, firstInc]);
          i = firstInc + 1;
        } else {
          i = firstInc + 1;
        }
      } else {
        i++;
      }
    }
    const valleyReq = [];
    let minNeeded = 0n;
    for (const [l, r] of valleys) {
      let alreadyHas = false;
      for (let k = l; k <= r; k++) {
        if (s[k] === 1) { alreadyHas = true; break; }
      }
      if (alreadyHas) {
        valleyReq.push({ l, r, satisfied: true, minCost: 0n });
      } else {
        let bestCost = Infinity;
        for (let k = l; k <= r; k++) {
          if (c[k] < bestCost) bestCost = c[k];
        }
        minNeeded += bestCost;
        valleyReq.push({ l, r, satisfied: false, minCost: bestCost });
      }
    }
    if (minNeeded > bBudget) {
      out.push('-1');
      continue;
    }
    for (let k = 0; k < n - 1; k++) {
      if (s[k] === 1) continue;
      const cost = c[k];
      let satisfiesValleys = [];
      let savedMin = 0n;
      for (let v = 0; v < valleyReq.length; v++) {
        const vq = valleyReq[v];
        if (!vq.satisfied && k >= vq.l && k <= vq.r) {
          satisfiesValleys.push(v);
          savedMin += vq.minCost;
        }
      }
      const newNeeded = minNeeded - savedMin;
      if (bBudget >= cost && bBudget - cost >= newNeeded) {
        s[k] = 1;
        bBudget -= cost;
        minNeeded = newNeeded;
        for (const v of satisfiesValleys) {
          valleyReq[v].satisfied = true;
        }
      }
    }
    out.push(s.join(''));
  }
  console.log(out.join('\n'));
}

solve();
