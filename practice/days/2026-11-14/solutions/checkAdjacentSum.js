const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);
    const a = [];
    let sumA = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      a.push(v);
      sumA += v;
    }

    const pairMap = new Map();
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const s = a[i] + a[j];
        if (!pairMap.has(s)) pairMap.set(s, [i, j]);
      }
    }

    const targetSum = 2 * sumA;

    for (let qi = 0; qi < q; qi++) {
      const x = parseInt(input[ptr++], 10);
      const req = targetSum - x;
      if (!pairMap.has(req)) {
        out.push('-1');
      } else {
        const [uIdx, vIdx] = pairMap.get(req);
        const res = [a[uIdx]];
        for (let i = 0; i < n; i++) {
          if (i !== uIdx && i !== vIdx) res.push(a[i]);
        }
        res.push(a[vIdx]);
        out.push(res.join(' '));
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
