const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const segs = [];
    for (let i = 0; i < n; i++) {
      segs.push({ l: nextInt(), r: nextInt(), id: i });
    }

    segs.sort((a, b) => a.l - b.l || a.r - b.r);

    let maxR = segs[0].r;
    let splitIdx = -1;

    for (let i = 1; i < n; i++) {
      if (segs[i].l > maxR) {
        splitIdx = i;
        break;
      }
      if (segs[i].r > maxR) maxR = segs[i].r;
    }

    if (splitIdx === -1) {
      out.push('-1');
    } else {
      const ans = new Int32Array(n);
      for (let i = 0; i < splitIdx; i++) ans[segs[i].id] = 1;
      for (let i = splitIdx; i < n; i++) ans[segs[i].id] = 2;
      out.push(ans.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
