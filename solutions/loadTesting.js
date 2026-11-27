const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  const n = parseInt(tokens[0], 10);
  const a = new Float64Array(n);
  for (let i = 0; i < n; i++) a[i] = Number(tokens[i + 1]);

  const prefVal = new Float64Array(n);
  const prefCost = new Float64Array(n);
  prefVal[0] = a[0];
  prefCost[0] = 0;
  for (let i = 1; i < n; i++) {
    const v = Math.max(a[i], prefVal[i - 1] + 1);
    prefVal[i] = v;
    prefCost[i] = prefCost[i - 1] + (v - a[i]);
  }

  const suffVal = new Float64Array(n);
  const suffCost = new Float64Array(n);
  suffVal[n - 1] = a[n - 1];
  suffCost[n - 1] = 0;
  for (let i = n - 2; i >= 0; i--) {
    const v = Math.max(a[i], suffVal[i + 1] + 1);
    suffVal[i] = v;
    suffCost[i] = suffCost[i + 1] + (v - a[i]);
  }

  let ans = Infinity;
  for (let i = 0; i < n; i++) {
    const curP = Math.max(prefVal[i], suffVal[i]);
    const costL = i > 0 ? prefCost[i - 1] : 0;
    const costR = i < n - 1 ? suffCost[i + 1] : 0;
    const cost = costL + costR + (curP - a[i]);
    if (cost < ans) ans = cost;
  }
  console.log(ans);
}
