const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  const par = new Int32Array(26);
  const find = (x) => {
    while (par[x] !== x) {
      par[x] = par[par[x]];
      x = par[x];
    }
    return x;
  };
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const deg = new Int32Array(26);
    const used = new Uint8Array(26);
    for (let i = 0; i < 26; i++) par[i] = i;
    for (let i = 0; i < n; i++) {
      const w = readLine().trim();
      const a = w.charCodeAt(0) - 97;
      const b = w.charCodeAt(w.length - 1) - 97;
      deg[a]++;
      deg[b]--;
      used[a] = used[b] = 1;
      par[find(a)] = find(b);
    }
    let plus = 0, minus = 0, ok = true, root = -1;
    for (let i = 0; i < 26; i++) {
      if (!used[i]) continue;
      if (deg[i] === 1) plus++;
      else if (deg[i] === -1) minus++;
      else if (deg[i] !== 0) ok = false;
      const r = find(i);
      if (root === -1) root = r;
      else if (root !== r) ok = false;
    }
    if (plus > 1 || minus > 1 || plus !== minus) ok = false;
    print(ok ? 'Ordering is possible.' : 'The door cannot be opened.');
  }
}

solve();
printAll();
