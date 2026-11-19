const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const S = Number(input[1]);
  const a = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = Number(input[2 + i]);
  }

  function getCost(k) {
    if (k === 0) return 0;
    const costs = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      costs[i] = a[i] + (i + 1) * k;
    }
    costs.sort();
    let sum = 0;
    for (let i = 0; i < k; i++) {
      sum += costs[i];
    }
    return sum;
  }

  let low = 0;
  let high = n;
  let bestK = 0;
  let bestCost = 0;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const c = getCost(mid);
    if (c <= S) {
      bestK = mid;
      bestCost = c;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  console.log(bestK + ' ' + bestCost);
}

solve();
