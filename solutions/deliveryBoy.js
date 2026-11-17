const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const n = readInt();
  if (n === null) return;

  const dist = Array.from({ length: n }, () => new Int32Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dist[i][j] = readInt();
    }
  }

  for (let k = 0; k < n; k++) {
    const distK = dist[k];
    for (let i = 0; i < n; i++) {
      const distI = dist[i];
      const dik = distI[k];
      for (let j = 0; j < n; j++) {
        const alt = dik + distK[j];
        if (alt < distI[j]) {
          distI[j] = alt;
        }
      }
    }
  }

  const m = readInt();
  if (m === null) return;
  const out = [];

  for (let q = 0; q < m; q++) {
    const s = readInt();
    const g = readInt();
    const d = readInt();
    const total = dist[s][g] + dist[g][d];
    const direct = dist[s][d];
    const saved = total - direct;
    out.push(`${total} ${saved}`);
  }

  console.log(out.join('\n'));
}

solve();
