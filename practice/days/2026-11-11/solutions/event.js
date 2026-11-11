const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const days = {
    saturday: 0,
    sunday: 1,
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
  };
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = days[tokens[ptr++]];
    const e = days[tokens[ptr++]];
    const l = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);
    const base = ((e - s + 7) % 7) + 1;
    let cnt = 0;
    let val = -1;
    for (let d = base; d <= r; d += 7) {
      if (d >= l) {
        cnt++;
        val = d;
      }
    }
    if (cnt === 0) out.push('impossible');
    else if (cnt === 1) out.push(val);
    else out.push('many');
  }

  console.log(out.join('\n'));
}

solve();
