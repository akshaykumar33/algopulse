const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) a[i] = parseInt(tokens[ptr++], 10);
    const b = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) b[i] = parseInt(tokens[ptr++], 10);

    let selfCount = 0;
    let possible = true;
    for (let i = 1; i <= n; i++) {
      if (a[i] === b[i]) selfCount++;
    }

    if ((n % 2 === 0 && selfCount !== 0) || (n % 2 === 1 && selfCount !== 1)) {
      possible = false;
    }

    const pos = new Map();
    for (let i = 1; i <= n; i++) {
      pos.set(a[i] + ',' + b[i], i);
    }

    for (let i = 1; i <= n; i++) {
      if (a[i] !== b[i]) {
        if (!pos.has(b[i] + ',' + a[i])) {
          possible = false;
          break;
        }
      }
    }

    if (!possible) {
      out.push('-1');
      continue;
    }

    const swaps = [];
    const doSwap = (i, j) => {
      if (i === j) return;
      swaps.push(i + ' ' + j);
      const ta = a[i]; a[i] = a[j]; a[j] = ta;
      const tb = b[i]; b[i] = b[j]; b[j] = tb;
      pos.set(a[i] + ',' + b[i], i);
      pos.set(a[j] + ',' + b[j], j);
    };

    for (let i = 1; i <= Math.floor(n / 2); i++) {
      const j = n - i + 1;
      if (a[i] === b[i]) {
        let alt = -1;
        for (let k = 1; k <= n; k++) {
          if (a[k] !== b[k]) {
            alt = k;
            break;
          }
        }
        if (alt !== -1) {
          doSwap(i, alt);
        }
      }

      const targetA = b[i];
      const targetB = a[i];
      const curPos = pos.get(targetA + ',' + targetB);

      if (curPos !== j) {
        doSwap(curPos, j);
      }
    }

    if (n % 2 === 1) {
      const mid = Math.floor((n + 1) / 2);
      let selfPos = -1;
      for (let i = 1; i <= n; i++) {
        if (a[i] === b[i]) {
          selfPos = i;
          break;
        }
      }
      if (selfPos !== -1 && selfPos !== mid) {
        doSwap(selfPos, mid);
      }
    }

    out.push(swaps.length);
    for (let i = 0; i < swaps.length; i++) {
      out.push(swaps[i]);
    }
  }
  console.log(out.join('\n'));
}

solve();
