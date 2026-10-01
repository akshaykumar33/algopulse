const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];

  for (let i = 1; i <= t; i++) {
    const line = input[i]?.trim();
    if (!line) continue;
    const basic = parseFloat(line);
    let gross = 0;
    if (basic < 1500) {
      gross = basic + 0.1 * basic + 0.9 * basic;
    } else {
      gross = basic + 500 + 0.98 * basic;
    }
    out.push(Number.isInteger(gross) ? gross.toString() : gross.toFixed(2));
  }

  console.log(out.join('\n'));
}

solve();
