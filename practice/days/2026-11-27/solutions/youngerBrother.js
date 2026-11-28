const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split(/\s+/).filter(Boolean);
let idx = 0;
const next = () => input[idx++];
const readInt = () => parseInt(next(), 10);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const N = 1000;
  const g = new Uint8Array(N * N);
  const dx = [1, 2, 0, 0, 1, 2], dy = [0, 0, 1, 2, 1, 2];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let mask = 0;
      for (let d = 0; d < 6; d++) {
        const x = i - dx[d], y = j - dy[d];
        if (x >= 0 && y >= 0) mask |= 1 << g[x * N + y];
      }
      let v = 0;
      while (mask >> v & 1) v++;
      g[i * N + j] = v;
    }
  }
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const c = readInt();
    let x = 0;
    for (let i = 0; i < c; i++) {
      const n = readInt(), m = readInt();
      x ^= g[(n - 1) * N + (m - 1)];
    }
    print(x ? 'MasterChef' : 'Football');
  }
}

solve();
printAll();
