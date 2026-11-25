const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const n = parseInt(data[ptr++], 10);
  const d = parseInt(data[ptr++], 10);
  const par = new Int32Array(n + 1);
  const sz = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    par[i] = i;
    sz[i] = 1;
  }
  function find(x) {
    while (par[x] !== x) {
      par[x] = par[par[x]];
      x = par[x];
    }
    return x;
  }
  let extra = 0;
  const out = [];
  for (let i = 0; i < d; i++) {
    const u = parseInt(data[ptr++], 10);
    const v = parseInt(data[ptr++], 10);
    let ru = find(u);
    let rv = find(v);
    if (ru === rv) {
      extra++;
    } else {
      if (sz[ru] < sz[rv]) {
        const tmp = ru;
        ru = rv;
        rv = tmp;
      }
      par[rv] = ru;
      sz[ru] += sz[rv];
    }
    const comps = [];
    for (let j = 1; j <= n; j++) {
      if (par[j] === j) comps.push(sz[j]);
    }
    comps.sort((a, b) => b - a);
    let sum = 0;
    const take = Math.min(comps.length, extra + 1);
    for (let j = 0; j < take; j++) sum += comps[j];
    out.push(sum - 1);
  }
  console.log(out.join('\n'));
}

solve();
