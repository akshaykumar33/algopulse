const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, m] = readIntArray();
    let best = -1, bh = 0, bv = 0, bs = 0;
    for (let h = 0; 2 * h <= m && h <= n; h++) {
      for (let v = 0; h + 2 * v <= n && 2 * h + v <= m; v++) {
        const s = Math.min(n - h - 2 * v, m - 2 * h - v);
        const cur = 2 * h + 2 * v + s;
        if (cur > best) {
          best = cur;
          bh = h;
          bv = v;
          bs = s;
        }
      }
    }
    const g = Array.from({ length: n }, () => new Array(m).fill('.'));
    let r = 0, c = 0;
    for (let i = 0; i < bh; i++) {
      g[r][c] = g[r][c + 1] = 'R';
      r++;
      c += 2;
    }
    for (let i = 0; i < bv; i++) {
      g[r][c] = g[r + 1][c] = 'R';
      r += 2;
      c++;
    }
    for (let i = 0; i < bs; i++) {
      g[r][c] = 'R';
      r++;
      c++;
    }
    print(best);
    for (let i = 0; i < n; i++) print(g[i].join(''));
  }
}

solve();
printAll();
