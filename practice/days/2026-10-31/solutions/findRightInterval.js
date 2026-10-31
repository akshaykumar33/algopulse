var findRightInterval = function(intervals) {
    const n = intervals.length;
    const starts = new Array(n);
    for (let i = 0; i < n; i++) {
        starts[i] = [intervals[i][0], i];
    }
    starts.sort((a, b) => a[0] - b[0]);
    const ans = new Array(n);
    for (let i = 0; i < n; i++) {
        const target = intervals[i][1];
        let l = 0, r = n - 1;
        let idx = -1;
        while (l <= r) {
            const mid = (l + r) >> 1;
            if (starts[mid][0] >= target) {
                idx = starts[mid][1];
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        ans[i] = idx;
    }
    return ans;
};
var solve = findRightInterval;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(solve(parsed)));
    }
  }
}
module.exports = solve;
