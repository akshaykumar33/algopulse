const fs = require('fs');

function solve() {
  const content = fs.readFileSync(0, 'utf-8').trim();
  if (!content) return;
  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let linePtr = 0;
  const t = Number(lines[linePtr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const [numNodes, target, k] = lines[linePtr++].split(/\s+/).map(Number);
    const tokens = lines[linePtr++].split(/\s+/);

    const adj = new Map();
    const addEdge = (u, v) => {
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u).push(v);
      adj.get(v).push(u);
    };

    let tokPtr = 0;
    const rootVal = Number(tokens[tokPtr++]);
    if (!adj.has(rootVal)) adj.set(rootVal, []);
    const queue = [rootVal];

    while (queue.length > 0 && tokPtr < tokens.length) {
      const parent = queue.shift();
      if (tokPtr < tokens.length) {
        const leftToken = tokens[tokPtr++];
        if (leftToken !== 'null') {
          const leftVal = Number(leftToken);
          addEdge(parent, leftVal);
          queue.push(leftVal);
        }
      }
      if (tokPtr < tokens.length) {
        const rightToken = tokens[tokPtr++];
        if (rightToken !== 'null') {
          const rightVal = Number(rightToken);
          addEdge(parent, rightVal);
          queue.push(rightVal);
        }
      }
    }

    if (k === 0) {
      out.push(String(target));
      continue;
    }

    const dist = new Map();
    dist.set(target, 0);
    const bfsQ = [target];
    const res = [];

    while (bfsQ.length > 0) {
      const u = bfsQ.shift();
      const d = dist.get(u);
      if (d === k) {
        res.push(u);
        continue;
      }
      const neighbors = adj.get(u) || [];
      for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        if (!dist.has(v)) {
          dist.set(v, d + 1);
          bfsQ.push(v);
        }
      }
    }

    res.sort((a, b) => a - b);
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
