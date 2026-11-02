var queueReconstructionByHeight = function(people) {
  people.sort((a, b) => {
    if (b[0] !== a[0]) {
      return b[0] - a[0];
    }
    return a[1] - b[1];
  });
  let res = [];
  for (const p of people) {
    res.splice(p[1], 0, p);
  }
  return res;
};
var solve = typeof queueReconstructionByHeight !== 'undefined' ? queueReconstructionByHeight : null;

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
