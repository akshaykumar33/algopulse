const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const waiting = [];
    for (let i = 1; i <= n; i++) {
      const r = parseInt(input[ptr++], 10);
      const minR = parseInt(input[ptr++], 10);
      const maxR = parseInt(input[ptr++], 10);
      const time = parseInt(input[ptr++], 10);
      const isRated = input[ptr++];
      const color = input[ptr++];
      let matchIdx = -1;
      for (let j = 0; j < waiting.length; j++) {
        const opp = waiting[j];
        if (r >= opp.minR && r <= opp.maxR &&
            opp.r >= minR && opp.r <= maxR &&
            time === opp.time &&
            isRated === opp.isRated) {
          const c1 = color;
          const c2 = opp.color;
          if ((c1 === 'random' && c2 === 'random') ||
              (c1 === 'white' && c2 === 'black') ||
              (c1 === 'black' && c2 === 'white')) {
            matchIdx = j;
            break;
          }
        }
      }
      if (matchIdx !== -1) {
        out.push(waiting[matchIdx].id);
        waiting.splice(matchIdx, 1);
      } else {
        out.push('wait');
        waiting.push({ id: i, r, minR, maxR, time, isRated, color });
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
