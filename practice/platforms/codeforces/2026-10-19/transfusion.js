const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let oddSum = 0;
    let evenSum = 0;
    let oddCnt = 0;
    let evenCnt = 0;

    for (let i = 0; i < n; i++) {
      const val = Number(input[ptr++]);
      if (i % 2 === 0) {
        oddSum += val;
        oddCnt++;
      } else {
        evenSum += val;
        evenCnt++;
      }
    }

    if (oddSum % oddCnt === 0 && evenSum % evenCnt === 0 && (oddSum / oddCnt) === (evenSum / evenCnt)) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }

  console.log(out.join('\n'));
}

solve();
