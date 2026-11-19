var maximumBeauty = function(items, queries) {
  items.sort((a, b) => a[0] - b[0]);
  const n = items.length;
  for (let i = 1; i < n; i++) {
    if (items[i][1] < items[i - 1][1]) {
      items[i][1] = items[i - 1][1];
    }
  }

  const ans = new Array(queries.length);
  for (let q = 0; q < queries.length; q++) {
    const target = queries[q];
    let low = 0, high = n - 1, best = -1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (items[mid][0] <= target) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    ans[q] = best === -1 ? 0 : items[best][1];
  }

  return ans;
};

var solve = maximumBeauty;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = maximumBeauty;
