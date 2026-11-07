var minimumBuckets = function(hamsters) {
  let ans = 0;
  let lastBucket = -2;
  const n = hamsters.length;
  for (let i = 0; i < n; i++) {
    if (hamsters[i] === 'H') {
      if (lastBucket === i - 1) {
        continue;
      }
      if (i + 1 < n && hamsters[i + 1] === '.') {
        ans++;
        lastBucket = i + 1;
      } else if (i - 1 >= 0 && hamsters[i - 1] === '.') {
        ans++;
        lastBucket = i - 1;
      } else {
        return -1;
      }
    }
  }
  return ans;
};

var solve = minimumBuckets;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = solve;
