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

    const intervals = [];
    let lastDec = -1;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        lastDec = i;
      } else if (a[i] < a[i + 1]) {
        if (lastDec !== -1) {
          intervals.push([lastDec, i]);
          lastDec = -1;
        }
      }
    }

    const valleyOf = new Int32Array(n - 1).fill(-1);
    const valleyReq = [];
    let totalNeeded = 0n;

    for (let v = 0; v < intervals.length; v++) {
      const [l, r] = intervals[v];
      let alreadyHas = false;
      let bestCost = -1n;
      for (let k = l; k <= r; k++) {
        valleyOf[k] = v;
        if (s[k] === 1) alreadyHas = true;
        if (bestCost === -1n || c[k] < bestCost) bestCost = c[k];
      }
      if (alreadyHas) {
        valleyReq.push({ satisfied: true, minCost: 0n });
      } else {
        valleyReq.push({ satisfied: false, minCost: bestCost });
        totalNeeded += bestCost;
      }
    }

    if (totalNeeded > bBudget) {
      out.push('-1');
      continue;
    }

    for (let k = 0; k < n - 1; k++) {
      if (s[k] === 1) continue;
      const cost = c[k];
      const v = valleyOf[k];
      let newNeeded = totalNeeded;
      if (v !== -1 && !valleyReq[v].satisfied) {
        newNeeded -= valleyReq[v].minCost;
      }
      if (bBudget >= cost && bBudget - cost >= newNeeded) {
        s[k] = 1;
        bBudget -= cost;
        totalNeeded = newNeeded;
        if (v !== -1) {
          valleyReq[v].satisfied = true;
        }
      }
    }

    out.push(s.join(''));
  }
  console.log(out.join('\n'));
}

solve();
