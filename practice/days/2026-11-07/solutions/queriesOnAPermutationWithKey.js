var processQueries = function(queries, m) {
  const p = [];
  for (let i = 1; i <= m; i++) p.push(i);
  const ans = [];
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    const idx = p.indexOf(q);
    ans.push(idx);
    p.splice(idx, 1);
    p.unshift(q);
  }
  return ans;
};

var solve = processQueries;

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
