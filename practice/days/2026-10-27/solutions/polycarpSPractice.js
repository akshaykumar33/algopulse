const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const k = parseInt(tokens[ptr++], 10);

  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({ val: parseInt(tokens[ptr++], 10), idx: i });
  }

  arr.sort((a, b) => b.val - a.val);

  const chosen = arr.slice(0, k);
  let totalProfit = 0;
  for (let i = 0; i < k; i++) {
    totalProfit += chosen[i].val;
  }

  chosen.sort((a, b) => a.idx - b.idx);

  const parts = [];
  let last = -1;
  for (let i = 0; i < k - 1; i++) {
    parts.push(chosen[i].idx - last);
    last = chosen[i].idx;
  }
  parts.push(n - 1 - last);

  console.log(totalProfit);
  console.log(parts.join(' '));
}

solve();
