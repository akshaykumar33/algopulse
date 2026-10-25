const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = readInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    if (n === null) break;

    const princeTaken = new Uint8Array(n + 1);
    let unmarriedDaughter = -1;

    for (let d = 1; d <= n; d++) {
      const k = readInt();
      let married = false;
      for (let j = 0; j < k; j++) {
        const p = readInt();
        if (!married && princeTaken[p] === 0) {
          princeTaken[p] = 1;
          married = true;
        }
      }
      if (!married && unmarriedDaughter === -1) {
        unmarriedDaughter = d;
      }
    }

    if (unmarriedDaughter === -1) {
      out.push('OPTIMAL');
    } else {
      let freePrince = -1;
      for (let p = 1; p <= n; p++) {
        if (princeTaken[p] === 0) {
          freePrince = p;
          break;
        }
      }
      out.push('IMPROVE');
      out.push(unmarriedDaughter + ' ' + freePrince);
    }
  }

  console.log(out.join('\n'));
}

solve();
