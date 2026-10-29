const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const digits = new Uint8Array(10);
  for (let i = 1; i <= n; i++) {
    digits[parseInt(input[i], 10)] = 1;
  }

  function valid(num, expectedLen) {
    const s = num.toString();
    if (s.length !== expectedLen) return false;
    for (let i = 0; i < s.length; i++) {
      if (!digits[s.charCodeAt(i) - 48]) return false;
    }
    return true;
  }

  const ds = [];
  for (let i = 1; i <= 9; i++) {
    if (digits[i]) ds.push(i);
  }

  let count = 0;
  for (const d1 of ds) {
    for (const d2 of ds) {
      for (const d3 of ds) {
        const abc = d1 * 100 + d2 * 10 + d3;
        for (const d4 of ds) {
          const p2 = abc * d4;
          if (!valid(p2, 3)) continue;
          for (const d5 of ds) {
            const p1 = abc * d5;
            if (!valid(p1, 3)) continue;
            const de = d4 * 10 + d5;
            const prod = abc * de;
            if (valid(prod, 4)) {
              count++;
            }
          }
        }
      }
    }
  }
  console.log(count);
}

solve();
