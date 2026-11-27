const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    let ones = 0;
    for (let i = 0; i < n; i++) {
      const row = tokens[ptr++];
      for (let j = 0; j < m; j++) if (row[j] === '1') ones++;
    }
    out.push(ones % 2 === 1 ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
