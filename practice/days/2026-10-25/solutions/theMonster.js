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

  const a = readInt();
  const b = readInt();
  const c = readInt();
  const d = readInt();
  if (a === null || b === null || c === null || d === null) return;

  for (let x = 0; x <= 10000; x++) {
    const t = b + x * a;
    if (t >= d && (t - d) % c === 0) {
      console.log(t);
      return;
    }
  }

  console.log(-1);
}

solve();
