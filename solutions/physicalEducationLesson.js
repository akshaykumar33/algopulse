const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const x = Number(input[ptr++]);
    const s = new Set();

    function checkDivs(val, isAsc) {
      if (val <= 0) return;
      for (let i = 1; i * i <= val; i++) {
        if (val % i === 0) {
          const d1 = i;
          const d2 = val / i;
          for (let d = 0; d < 2; d++) {
            const div = d === 0 ? d1 : d2;
            if (div % 2 === 0) {
              const k = (div >> 1) + 1;
              if (k >= 2) {
                if (isAsc && k >= x) s.add(k);
                if (!isAsc && k > x) s.add(k);
              }
            }
          }
        }
      }
    }

    checkDivs(n - x, true);
    checkDivs(n + x - 2, false);

    out.push(s.size);
  }

  console.log(out.join('\n'));
}

solve();
