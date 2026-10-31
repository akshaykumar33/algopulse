var hIndexII = function(citations) {
    let n = citations.length;
    let l = 0, r = n - 1;
    while (l <= r) {
        let mid = (l + r) >> 1;
        if (citations[mid] >= n - mid) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return n - l;
};

var solve = hIndexII;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
