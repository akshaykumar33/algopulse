const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const d = parseInt(tokens[ptr++], 10);
    const probOnDay = new Array(32).fill(0);
    for (let i = 0; i < d; i++) {
      const day = parseInt(tokens[ptr++], 10);
      const p = parseInt(tokens[ptr++], 10);
      probOnDay[day] = p;
    }

    const pref = new Array(32).fill(0);
    for (let i = 1; i <= 31; i++) {
      pref[i] = pref[i - 1] + probOnDay[i];
    }

    const q = parseInt(tokens[ptr++], 10);
    for (let i = 0; i < q; i++) {
      let deadline = parseInt(tokens[ptr++], 10);
      const req = parseInt(tokens[ptr++], 10);
      if (deadline > 31) deadline = 31;
      if (pref[deadline] >= req) {
        out.push('Go Camp');
      } else {
        out.push('Go Sleep');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
