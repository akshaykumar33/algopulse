const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const p = input[ptr++];

    let cS = 0, cP = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') cS++;
      if (p[i] === '1') cP++;
    }

    const maxTeams = Math.min(cS, cP, Math.floor(n / 2));
    out.push(maxTeams);
  }
  console.log(out.join('\n'));
}

solve();
