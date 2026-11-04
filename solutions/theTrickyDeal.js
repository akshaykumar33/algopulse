const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = BigInt(input[ptr++]);

    let d1 = 0;
    let d2 = 0;
    let maxProfit = -1n;
    let cumProfit = 0n;
    let pay = 1n;
    let d = 1;

    while (true) {
      cumProfit += (a - pay);
      if (cumProfit > 0n) {
        d1 = d;
      }
      if (cumProfit > maxProfit) {
        maxProfit = cumProfit;
        d2 = d;
      }
      if (cumProfit <= 0n && d > 1) {
        break;
      }
      pay *= 2n;
      d++;
    }

    out.push(`${d1} ${d2}`);
  }

  console.log(out.join('\n'));
}

solve();

