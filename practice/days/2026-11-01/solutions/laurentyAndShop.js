const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = [];
  for (let i = 0; i < n - 1; i++) a.push(parseInt(tokens[ptr++], 10));
  const b = [];
  for (let i = 0; i < n - 1; i++) b.push(parseInt(tokens[ptr++], 10));
  const c = [];
  for (let i = 0; i < n; i++) c.push(parseInt(tokens[ptr++], 10));

  const prefA = [0];
  for (let i = 0; i < n - 1; i++) prefA.push(prefA[i] + a[i]);
  const sufA = new Array(n).fill(0);
  for (let i = n - 2; i >= 0; i--) sufA[i] = sufA[i + 1] + a[i];

  const prefB = [0];
  for (let i = 0; i < n - 1; i++) prefB.push(prefB[i] + b[i]);
  const sufB = new Array(n).fill(0);
  for (let i = n - 2; i >= 0; i--) sufB[i] = sufB[i + 1] + b[i];

  const costs = [];
  for (let i = 0; i < n; i++) {
    const cost1 = prefA[i] + c[i] + sufB[i];
    const cost2 = prefB[i] + c[i] + sufA[i];
    costs.push(Math.min(cost1, cost2));
  }

  costs.sort((x, y) => x - y);
  console.log(costs[0] + costs[1]);
}
solve();
