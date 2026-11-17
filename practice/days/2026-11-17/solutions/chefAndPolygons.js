const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let sign = 1;
    if (buffer[offset] === 45) {
      sign = -1;
      offset++;
    }
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return sign * num;
  }

  const T = readInt();
  if (T === null) return;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = readInt();
    if (n === null) break;

    const polygons = [];
    for (let i = 0; i < n; i++) {
      const m = readInt();
      let maxX = -Infinity;
      for (let j = 0; j < m; j++) {
        const x = readInt();
        const y = readInt();
        if (x > maxX) {
          maxX = x;
        }
      }
      polygons.push({ id: i, maxX });
    }

    polygons.sort((a, b) => a.maxX - b.maxX);

    const ans = new Int32Array(n);
    for (let rank = 0; rank < n; rank++) {
      ans[polygons[rank].id] = rank;
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
