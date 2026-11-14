const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const ans = new Int32Array(n + 1);

    const segsByLen = Array.from({ length: n + 1 }, () => []);
    segsByLen[n].push({ l: 1, r: n });

    let step = 1;
    for (let len = n; len >= 1; len--) {
      const list = segsByLen[len];
      if (list.length === 0) continue;
      list.sort((a, b) => a.l - b.l);

      for (let i = 0; i < list.length; i++) {
        const { l, r } = list[i];
        let mid;
        if (len % 2 === 1) mid = Math.floor((l + r) / 2);
        else mid = Math.floor((l + r - 1) / 2);

        ans[mid] = step++;

        if (mid - 1 >= l) {
          segsByLen[mid - l].push({ l, r: mid - 1 });
        }
        if (r >= mid + 1) {
          segsByLen[r - mid].push({ l: mid + 1, r });
        }
      }
    }

    const res = [];
    for (let i = 1; i <= n; i++) res.push(ans[i]);
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
