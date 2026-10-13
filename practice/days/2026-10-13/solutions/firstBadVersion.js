var solution = function(isBadVersion) {
    return function(n) {
        let l = 1, r = n;
        while (l < r) {
            let mid = l + Math.floor((r - l) / 2);
            if (isBadVersion(mid)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    };
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const [n, bad] = Array.isArray(parsed) ? parsed : [parsed, 4];
          const solve = solution(x => x >= bad);
          const result = solve(n);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.log(JSON.stringify(e.message));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solution;
