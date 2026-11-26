const fs = require('fs');

function solve() {
  const content = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
  if (!content || content.length === 0 || content[0] === '') return;

  const t = parseInt(content[0], 10);
  const out = [];
  const lucky = 'lucky';

  for (let tc = 1; tc <= t; tc++) {
    const s = content[tc];
    const n = s.length;
    if (n < 5) {
      out.push('unlucky');
      continue;
    }

    let bestCost = Infinity;
    let bestStr = null;

    for (let p = 0; p <= n - 5; p++) {
      const target = new Array(n).fill(null);
      let ok = true;
      for (let k = 0; k < 5; k++) {
        let idx = p + k;
        let ch = lucky[k];
        if (target[idx] !== null && target[idx] !== ch) {
          ok = false;
          break;
        }
        target[idx] = ch;
        let mIdx = n - 1 - idx;
        if (target[mIdx] !== null && target[mIdx] !== ch) {
          ok = false;
          break;
        }
        target[mIdx] = ch;
      }
      if (!ok) continue;

      let cost = 0;
      const res = new Array(n);
      for (let i = 0; i <= (n - 1) >> 1; i++) {
        let j = n - 1 - i;
        if (i === j) {
          if (target[i] !== null) {
            res[i] = target[i];
            if (s[i] !== target[i]) cost++;
          } else {
            res[i] = s[i];
          }
        } else {
          if (target[i] !== null && target[j] !== null) {
            res[i] = target[i];
            res[j] = target[j];
            if (s[i] !== target[i]) cost++;
            if (s[j] !== target[j]) cost++;
          } else if (target[i] !== null) {
            res[i] = target[i];
            res[j] = target[i];
            if (s[i] !== target[i]) cost++;
            if (s[j] !== target[i]) cost++;
          } else if (target[j] !== null) {
            res[i] = target[j];
            res[j] = target[j];
            if (s[i] !== target[j]) cost++;
            if (s[j] !== target[j]) cost++;
          } else {
            if (s[i] === s[j]) {
              res[i] = s[i];
              res[j] = s[j];
            } else {
              cost++;
              let minCh = s[i] < s[j] ? s[i] : s[j];
              res[i] = minCh;
              res[j] = minCh;
            }
          }
        }
      }

      let cand = res.join('');
      if (cost < bestCost) {
        bestCost = cost;
        bestStr = cand;
      } else if (cost === bestCost) {
        if (bestStr === null || cand < bestStr) {
          bestStr = cand;
        }
      }
    }

    if (bestStr === null) {
      out.push('unlucky');
    } else {
      out.push(bestStr + ' ' + bestCost);
    }
  }

  console.log(out.join('\n'));
}

solve();
