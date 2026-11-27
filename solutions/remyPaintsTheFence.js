const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000009n;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const posts = [];
    for (let i = 0; i < m; i++) {
      const col = tokens[ptr++];
      const pos = parseInt(tokens[ptr++], 10);
      posts.push({ col, pos });
    }
    posts.sort((a, b) => a.pos - b.pos);
    let ans = 1n;
    for (let i = 1; i < m; i++) {
      if (posts[i].col !== posts[i - 1].col) {
        const gap = BigInt(posts[i].pos - posts[i - 1].pos);
        ans = (ans * gap) % MOD;
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
