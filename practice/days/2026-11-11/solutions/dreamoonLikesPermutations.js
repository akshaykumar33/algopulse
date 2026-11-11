const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    const prefOk = new Uint8Array(n);
    const suffOk = new Uint8Array(n);
    const seen = new Uint8Array(n + 1);

    let mx = 0;
    for (let i = 0; i < n - 1; i++) {
      const v = arr[i];
      if (v < 1 || v > n || seen[v]) break;
      seen[v] = 1;
      if (v > mx) mx = v;
      if (mx === i + 1) prefOk[i + 1] = 1;
    }

    seen.fill(0);
    mx = 0;
    for (let i = n - 1; i >= 1; i--) {
      const v = arr[i];
      if (v < 1 || v > n || seen[v]) break;
      seen[v] = 1;
      if (v > mx) mx = v;
      const len = n - i;
      if (mx === len) suffOk[len] = 1;
    }

    const ans = [];
    for (let l1 = 1; l1 < n; l1++) {
      if (prefOk[l1] && suffOk[n - l1]) {
        ans.push(l1 + ' ' + (n - l1));
      }
    }

    out.push(String(ans.length));
    for (let i = 0; i < ans.length; i++) {
      out.push(ans[i]);
    }
  }

  console.log(out.join('\n'));
}

solve();
