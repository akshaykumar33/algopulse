var addRungs = function(rungs, dist) {
  let cur = 0;
  let ans = 0;

  for (let i = 0; i < rungs.length; i++) {
    const x = rungs[i];
    if (x - cur > dist) {
      ans += Math.floor((x - cur - 1) / dist);
    }
    cur = x;
  }

  return ans;
};

var solve = addRungs;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = addRungs;
