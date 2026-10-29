const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  function getTop3(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push({ val: parseInt(input[ptr++], 10), idx: i });
    }
    arr.sort((a, b) => b.val - a.val);
    return arr.slice(0, 3);
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const topA = getTop3(n);
    const topB = getTop3(n);
    const topC = getTop3(n);

    let maxVal = 0;
    for (const a of topA) {
      for (const b of topB) {
        if (b.idx === a.idx) continue;
        for (const c of topC) {
          if (c.idx === a.idx || c.idx === b.idx) continue;
          const sum = a.val + b.val + c.val;
          if (sum > maxVal) maxVal = sum;
        }
      }
    }
    out.push(maxVal.toString());
  }
  console.log(out.join('\n'));
}

solve();
