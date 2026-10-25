const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const activities = parseInt(input[idx++], 10);
    const origin = input[idx++];
    let laddus = 0;

    for (let i = 0; i < activities; i++) {
      const type = input[idx++];
      if (type === 'CONTEST_WON') {
        const rank = parseInt(input[idx++], 10);
        laddus += 300;
        if (rank < 20) laddus += (20 - rank);
      } else if (type === 'TOP_CONTRIBUTOR') {
        laddus += 300;
      } else if (type === 'BUG_FOUND') {
        const sev = parseInt(input[idx++], 10);
        laddus += sev;
      } else if (type === 'CONTEST_HOSTED') {
        laddus += 50;
      }
    }
    const divisor = origin === 'INDIAN' ? 200 : 400;
    out.push(Math.floor(laddus / divisor));
  }
  console.log(out.join('\n'));
}

solve();
