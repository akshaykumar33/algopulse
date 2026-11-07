var minimumRefill = function(plants, capacityA, capacityB) {
  let i = 0, j = plants.length - 1;
  let curA = capacityA, curB = capacityB;
  let ans = 0;
  while (i < j) {
    if (curA < plants[i]) {
      ans++;
      curA = capacityA;
    }
    curA -= plants[i++];
    if (curB < plants[j]) {
      ans++;
      curB = capacityB;
    }
    curB -= plants[j--];
  }
  if (i === j) {
    if (Math.max(curA, curB) < plants[i]) ans++;
  }
  return ans;
};

var solve = typeof minimumRefill !== 'undefined' ? minimumRefill : null;

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
  } catch (err) {}
}
module.exports = { minimumRefill, solve };
