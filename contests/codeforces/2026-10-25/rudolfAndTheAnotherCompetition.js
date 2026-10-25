const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = readInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    const m = readInt();
    const h = readInt();
    if (n === null || m === null || h === null) break;

    let rudolfSolved = 0;
    let rudolfPenalty = 0;
    let rank = 1;

    for (let p = 0; p < n; p++) {
      const times = new Int32Array(m);
      for (let j = 0; j < m; j++) {
        times[j] = readInt();
      }
      times.sort();

      let solved = 0;
      let penalty = 0;
      let cum = 0;
      for (let j = 0; j < m; j++) {
        if (cum + times[j] <= h) {
          cum += times[j];
          solved++;
          penalty += cum;
        } else {
          break;
        }
      }

      if (p === 0) {
        rudolfSolved = solved;
        rudolfPenalty = penalty;
      } else {
        if (solved > rudolfSolved || (solved === rudolfSolved && penalty < rudolfPenalty)) {
          rank++;
        }
      }
    }

    out.push(rank);
  }

  console.log(out.join('\n'));
}

solve();
