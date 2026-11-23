const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = [];
    let maxVal = -1;
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      a.push(v);
      if (v > maxVal) maxVal = v;
    }
    let allSame = true;
    for (let i = 1; i < n; i++) {
      if (a[i] !== a[0]) { allSame = false; break; }
    }
    if (allSame) {
      out.push(0);
      continue;
    }
    const dist = [];
    for (let i = 0; i < n; i++) dist.push([-1, -1]);
    const q = [];
    let qh = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] === maxVal) {
        dist[i][0] = 0;
        q.push(i, 0);
      }
    }
    while (qh < q.length) {
      const u = q[qh++];
      const p = q[qh++];
      const d = dist[u][p];
      const np = 1 - p;
      const left = (u - 1 + n) % n;
      if (dist[left][np] === -1) {
        dist[left][np] = d + 1;
        q.push(left, np);
      }
      const right = (u + 1) % n;
      if (dist[right][np] === -1) {
        dist[right][np] = d + 1;
        q.push(right, np);
      }
    }
    let ans = Infinity;
    for (let p = 0; p < 2; p++) {
      let maxD = 0;
      let ok = true;
      for (let i = 0; i < n; i++) {
        if (dist[i][p] === -1) { ok = false; break; }
        if (dist[i][p] > maxD) maxD = dist[i][p];
      }
      if (ok) {
        let tReq = maxD;
        if (tReq % 2 !== p) tReq++;
        if (tReq < ans) ans = tReq;
      }
    }
    out.push(ans === Infinity ? -1 : ans);
  }
  console.log(out.join('\n'));
}

solve();
