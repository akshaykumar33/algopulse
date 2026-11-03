const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const ops = [];
  for (let i = 0; i < n; i++) {
    const sign = tokens[ptr++];
    const id = parseInt(tokens[ptr++], 10);
    ops.push({ sign, id });
  }
  const inside = new Set();
  let cur = 0;
  let maxCap = 0;
  for (let i = 0; i < n; i++) {
    const op = ops[i];
    if (op.sign === '+') {
      inside.add(op.id);
      cur++;
    } else {
      if (inside.has(op.id)) {
        inside.delete(op.id);
        cur--;
      } else {
        maxCap++;
      }
    }
    if (cur > maxCap) {
      maxCap = cur;
    }
  }
  console.log(maxCap);
}
solve();
