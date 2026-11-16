const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const events = [];
    for (let i = 0; i < n; i++) {
      const s = parseInt(input[ptr++], 10);
      const e = parseInt(input[ptr++], 10);
      const c = parseInt(input[ptr++], 10);
      events.push({ s, e, c });
    }
    events.sort((a, b) => a.e - b.e);
    const dp = new Array(49).fill(0);
    let curIdx = 0;
    for (let time = 1; time <= 48; time++) {
      dp[time] = dp[time - 1];
      while (curIdx < n && events[curIdx].e === time) {
        const ev = events[curIdx];
        dp[time] = Math.max(dp[time], dp[ev.s] + ev.c);
        curIdx++;
      }
    }
    out.push(dp[48]);
  }
  console.log(out.join('\n'));
}

solve();
