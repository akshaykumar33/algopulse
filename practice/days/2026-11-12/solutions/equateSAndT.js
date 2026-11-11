const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const p = tokens[ptr++];

    let cs = 0;
    let fsIdx = -1;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 97) {
        if (fsIdx === -1) fsIdx = i;
        cs++;
      }
    }

    let cp = 0;
    let fpIdx = -1;
    for (let i = 0; i < m; i++) {
      if (p.charCodeAt(i) === 97) {
        if (fpIdx === -1) fpIdx = i;
        cp++;
      }
    }

    if (cs !== cp) {
      out.push('No');
    } else if (cs === 0) {
      out.push(n === m ? 'Yes' : 'No');
    } else {
      out.push(fsIdx === fpIdx ? 'Yes' : 'No');
    }
  }

  console.log(out.join('\n'));
}

solve();
