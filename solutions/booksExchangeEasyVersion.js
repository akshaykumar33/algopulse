function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let line = 0;
  const t = parseInt(input[line++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[line++]);
    const p = input[line++].split(' ').map(Number);

    const ans = new Array(n);
    const vis = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
      if (!vis[i]) {
        const cycle = [];
        let cur = i;
        while (!vis[cur]) {
          vis[cur] = true;
          cycle.push(cur);
          cur = p[cur] - 1; 
        }
        const cycleLen = cycle.length;
        for (const node of cycle) {
          ans[node] = cycleLen;
        }
      }
    }
    out.push(ans.join(' '));
  }
  console.log(out.join('\n'));
}

const fs = require('fs');
solve();
