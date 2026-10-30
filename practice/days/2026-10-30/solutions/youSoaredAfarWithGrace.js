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

    const pos = new Map();
    for (let i = 1; i <= n; i++) {
      pos.set(a[i] + ',' + b[i], i);
    }

    let possible = true;
    let selfCount = 0;
    for (let i = 1; i <= n; i++) {
      if (a[i] === b[i]) {
        selfCount++;
      } else {
        if (!pos.has(b[i] + ',' + a[i])) {
          possible = false;
          break;
        }
      }
    }

    if ((n % 2 === 0 && selfCount !== 0) || (n % 2 === 1 && selfCount !== 1)) {
      possible = false;
    }

    if (!possible) {
      out.push('-1');
      continue;
    }

    const swaps = [];
    const used = new Uint8Array(n + 1);

    for (let i = 1; i <= Math.floor(n / 2); i++) {
      const targetI = i;
      const targetJ = n - i + 1;

      let curI = targetI;
      if (used[curI]) {
        for (let k = 1; k <= n; k++) {
          if (!used[k] && a[k] !== b[k]) {
            curI = k;
            break;
          }
        }
      }

      const u = a[curI];
      const v = b[curI];
      const curJ = pos.get(v + ',' + u);

      used[curI] = 1;
      used[curJ] = 1;

      if (curI !== targetI) {
        swaps.push(curI + ' ' + targetI);
        pos.set(a[targetI] + ',' + b[targetI], curI);
        pos.set(u + ',' + v, targetI);
        const tmpA = a[curI]; a[curI] = a[targetI]; a[targetI] = tmpA;
        const tmpB = b[curI]; b[curI] = b[targetI]; b[targetI] = tmpB;
      }

      const updatedCurJ = pos.get(v + ',' + u);
      if (updatedCurJ !== targetJ) {
        swaps.push(updatedCurJ + ' ' + targetJ);
        pos.set(a[targetJ] + ',' + b[targetJ], updatedCurJ);
        pos.set(v + ',' + u, targetJ);
        const tmpA = a[updatedCurJ]; a[updatedCurJ] = a[targetJ]; a[targetJ] = tmpA;
        const tmpB = b[updatedCurJ]; b[updatedCurJ] = b[targetJ]; b[targetJ] = tmpB;
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
      if (selfPos !== mid) {
        swaps.push(selfPos + ' ' + mid);
        const tmpA = a[selfPos]; a[selfPos] = a[mid]; a[mid] = tmpA;
        const tmpB = b[selfPos]; b[selfPos] = b[mid]; b[mid] = tmpB;
      }
    }

    out.push(swaps.length);
    for (const s of swaps) out.push(s);
  }
  console.log(out.join('\n'));
}

solve();
