const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const seen = new Uint8Array(n);
    let ok = true;
    for (let i = 0; i < n; i++) {
      const a = parseInt(tokens[ptr++], 10);
      if (!ok) continue;
      const mod = ((i + a) % n + n) % n;
      if (seen[mod]) ok = false;
      seen[mod] = 1;
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
