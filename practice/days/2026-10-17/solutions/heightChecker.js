var heightChecker = function(heights) {
  const cnt = new Array(101).fill(0);
  for (const h of heights) {
    cnt[h]++;
  }
  let ans = 0;
  let cur = 1;
  for (const h of heights) {
    while (cnt[cur] === 0) {
      cur++;
    }
    if (cur !== h) {
      ans++;
    }
    cnt[cur]--;
  }
  return ans;
};

var solve = heightChecker;

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
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
