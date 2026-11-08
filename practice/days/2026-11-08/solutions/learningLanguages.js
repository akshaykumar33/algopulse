const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;

  function find(i) {
    let root = i;
    while (root !== parent[root]) root = parent[root];
    let curr = i;
    while (curr !== root) {
      const nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
    }
  }

  const langSpeakers = Array.from({ length: m + 1 }, () => []);
  let totalLangs = 0;

  for (let i = 0; i < n; i++) {
    const k = parseInt(input[ptr++], 10);
    totalLangs += k;
    for (let j = 0; j < k; j++) {
      const lang = parseInt(input[ptr++], 10);
      langSpeakers[lang].push(i);
    }
  }

  if (totalLangs === 0) {
    console.log(n);
    return;
  }

  for (let l = 1; l <= m; l++) {
    const speakers = langSpeakers[l];
    for (let j = 1; j < speakers.length; j++) {
      union(speakers[0], speakers[j]);
    }
  }

  const compSet = new Set();
  for (let i = 0; i < n; i++) {
    compSet.add(find(i));
  }

  console.log(compSet.size - 1);
}

solve();
