const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    const idxN = [];
    const idxS = [];
    const idxW = [];
    const idxE = [];

    for (let i = 0; i < n; i++) {
      if (s[i] === 'N') idxN.push(i);
      else if (s[i] === 'S') idxS.push(i);
      else if (s[i] === 'W') idxW.push(i);
      else if (s[i] === 'E') idxE.push(i);
    }

    const cN = idxN.length;
    const cS = idxS.length;
    const cW = idxW.length;
    const cE = idxE.length;

    if (Math.abs(cN - cS) % 2 !== 0 || Math.abs(cW - cE) % 2 !== 0) {
      out.push('NO');
      continue;
    }

    const minNS = Math.min(cN, cS);
    const minWE = Math.min(cW, cE);
    const surN = cN - minNS;
    const surS = cS - minNS;
    const surW = cW - minWE;
    const surE = cE - minWE;
    const totalSurplus = surN + surS + surW + surE;

    const res = new Array(n);

    if (totalSurplus > 0) {
      for (let i = 0; i < minNS; i++) {
        res[idxN[i]] = 'R';
        res[idxS[i]] = 'R';
      }
      for (let i = 0; i < minWE; i++) {
        res[idxW[i]] = 'R';
        res[idxE[i]] = 'R';
      }
      for (let i = minNS; i < cN; i++) {
        res[idxN[i]] = (i - minNS < surN / 2) ? 'R' : 'H';
      }
      for (let i = minNS; i < cS; i++) {
        res[idxS[i]] = (i - minNS < surS / 2) ? 'R' : 'H';
      }
      for (let i = minWE; i < cW; i++) {
        res[idxW[i]] = (i - minWE < surW / 2) ? 'R' : 'H';
      }
      for (let i = minWE; i < cE; i++) {
        res[idxE[i]] = (i - minWE < surE / 2) ? 'R' : 'H';
      }
      out.push(res.join(''));
    } else {
      if (minNS + minWE === 1) {
        out.push('NO');
        continue;
      }
      if (minNS >= 1 && minWE >= 1) {
        res[idxN[0]] = 'R';
        res[idxS[0]] = 'R';
        res[idxW[0]] = 'H';
        res[idxE[0]] = 'H';
        for (let i = 1; i < minNS; i++) {
          res[idxN[i]] = 'R';
          res[idxS[i]] = 'R';
        }
        for (let i = 1; i < minWE; i++) {
          res[idxW[i]] = 'R';
          res[idxE[i]] = 'R';
        }
      } else if (minNS >= 2) {
        res[idxN[0]] = 'R';
        res[idxS[0]] = 'R';
        res[idxN[1]] = 'H';
        res[idxS[1]] = 'H';
        for (let i = 2; i < minNS; i++) {
          res[idxN[i]] = 'R';
          res[idxS[i]] = 'R';
        }
      } else if (minWE >= 2) {
        res[idxW[0]] = 'R';
        res[idxE[0]] = 'R';
        res[idxW[1]] = 'H';
        res[idxE[1]] = 'H';
        for (let i = 2; i < minWE; i++) {
          res[idxW[i]] = 'R';
          res[idxE[i]] = 'R';
        }
      }
      out.push(res.join(''));
    }
  }

  console.log(out.join('\n'));
}

solve();
