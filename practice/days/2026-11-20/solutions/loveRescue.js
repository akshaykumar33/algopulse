const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const a = input[1];
  const b = input[2];

  const parent = new Int32Array(26);
  for (let i = 0; i < 26; i++) parent[i] = i;

  function find(i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  }

  const res = [];
  for (let i = 0; i < n; i++) {
    const u = a.charCodeAt(i) - 97;
    const v = b.charCodeAt(i) - 97;
    const rootU = find(u);
    const rootV = find(v);
    if (rootU !== rootV) {
      parent[rootU] = rootV;
      res.push(a[i] + ' ' + b[i]);
    }
  }

  console.log(res.length);
  if (res.length > 0) {
    console.log(res.join('\n'));
  }
}

solve();
