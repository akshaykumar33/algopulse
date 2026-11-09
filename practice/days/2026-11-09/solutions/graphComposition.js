const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  class DSU {
    constructor(n) {
      this.p = new Int32Array(n + 1);
      for (let i = 1; i <= n; i++) this.p[i] = i;
    }
    find(i) {
      let root = i;
      while (root !== this.p[root]) root = this.p[root];
      let curr = i;
      while (curr !== root) {
        const nxt = this.p[curr];
        this.p[curr] = root;
        curr = nxt;
      }
      return root;
    }
    unite(i, j) {
      const rootI = this.find(i);
      const rootJ = this.find(j);
      if (rootI !== rootJ) {
        this.p[rootI] = rootJ;
        return true;
      }
      return false;
    }
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m1 = parseInt(input[ptr++], 10);
    const m2 = parseInt(input[ptr++], 10);

    const fU = new Int32Array(m1);
    const fV = new Int32Array(m1);
    for (let i = 0; i < m1; i++) {
      fU[i] = parseInt(input[ptr++], 10);
      fV[i] = parseInt(input[ptr++], 10);
    }

    const gU = new Int32Array(m2);
    const gV = new Int32Array(m2);
    const dsuG = new DSU(n);
    for (let i = 0; i < m2; i++) {
      gU[i] = parseInt(input[ptr++], 10);
      gV[i] = parseInt(input[ptr++], 10);
      dsuG.unite(gU[i], gV[i]);
    }

    let ans = 0;
    const dsuF = new DSU(n);

    for (let i = 0; i < m1; i++) {
      const u = fU[i];
      const v = fV[i];
      if (dsuG.find(u) === dsuG.find(v)) {
        dsuF.unite(u, v);
      } else {
        ans++;
      }
    }

    for (let i = 0; i < m2; i++) {
      const u = gU[i];
      const v = gV[i];
      if (dsuF.find(u) !== dsuF.find(v)) {
        dsuF.unite(u, v);
        ans++;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
