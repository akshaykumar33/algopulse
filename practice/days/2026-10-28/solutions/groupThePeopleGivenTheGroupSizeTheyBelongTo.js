var groupThePeople = function(groupSizes) {
  const map = new Map();
  const res = [];

  for (let i = 0; i < groupSizes.length; i++) {
    const sz = groupSizes[i];
    if (!map.has(sz)) {
      map.set(sz, []);
    }
    const bucket = map.get(sz);
    bucket.push(i);
    if (bucket.length === sz) {
      res.push(bucket);
      map.delete(sz);
    }
  }

  return res;
};

var solve = function(groupSizes) {
  return groupThePeople(groupSizes);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

