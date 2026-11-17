const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T = readInt();
  if (T === null) return;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = readInt();
    if (n === null) break;

    const eventsByEnd = Array.from({ length: 49 }, () => []);
    for (let i = 0; i < n; i++) {
      const s = readInt();
      const e = readInt();
      const c = readInt();
      if (e <= 48) {
        eventsByEnd[e].push([s, c]);
      }
    }

    const dp = new Float64Array(49);
    for (let time = 1; time <= 48; time++) {
      dp[time] = dp[time - 1];
      for (const [start, cost] of eventsByEnd[time]) {
        const val = dp[start] + cost;
        if (val > dp[time]) {
          dp[time] = val;
        }
      }
    }

    out.push(dp[48].toString());
  }

  console.log(out.join('\n'));
}

solve();
