const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
    }

    const suffMex = new Int32Array(n + 1);
    const seenSuff = new Uint8Array(n + 2);
    let curMex = 0;
    for (let i = n - 1; i >= 0; i--) {
      if (a[i] <= n + 1) seenSuff[a[i]] = 1;
      while (seenSuff[curMex]) curMex++;
      suffMex[i] = curMex;
    }

    const b = [];
    const seen = new Uint8Array(n + 2);
    let i = 0;

    while (i < n) {
      const target = suffMex[i];
      if (target === 0) {
        b.push(0);
        i++;
        continue;
      }

      let count = 0;
      let j = i;
      while (j < n && count < target) {
        const val = a[j];
        if (val < target && !seen[val]) {
          seen[val] = 1;
          count++;
        }
        j++;
      }

      for (let k = i; k < j; k++) {
        if (a[k] < target) {
          seen[a[k]] = 0;
        }
      }

      b.push(target);
      i = j;
    }

    out.push(b.length);
    out.push(b.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

