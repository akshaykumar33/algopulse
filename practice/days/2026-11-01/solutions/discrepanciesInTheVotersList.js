const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n1 = parseInt(tokens[ptr++], 10);
  const n2 = parseInt(tokens[ptr++], 10);
  const n3 = parseInt(tokens[ptr++], 10);
  const total = n1 + n2 + n3;

  const count = new Map();
  for (let i = 0; i < total; i++) {
    const id = parseInt(tokens[ptr++], 10);
    count.set(id, (count.get(id) || 0) + 1);
  }

  const ans = [];
  for (const [id, c] of count.entries()) {
    if (c >= 2) ans.push(id);
  }

  ans.sort((a, b) => a - b);
  const out = [ans.length];
  for (let i = 0; i < ans.length; i++) {
    out.push(ans[i]);
  }

  console.log(out.join('\n'));
}

solve();

