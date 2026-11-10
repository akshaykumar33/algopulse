var pyramidTransition = function(bottom, allowed) {
  const map = new Map();
  for (let i = 0; i < allowed.length; i++) {
    const pair = allowed[i].slice(0, 2);
    const top = allowed[i][2];
    if (!map.has(pair)) map.set(pair, []);
    map.get(pair).push(top);
  }

  const memo = new Set();

  function dfs(row) {
    if (row.length === 1) return true;
    if (memo.has(row)) return false;

    function buildNext(idx, cur) {
      if (idx === row.length - 1) {
        return dfs(cur);
      }
      const pair = row[idx] + row[idx + 1];
      const opts = map.get(pair);
      if (!opts) return false;
      for (let i = 0; i < opts.length; i++) {
        if (buildNext(idx + 1, cur + opts[i])) return true;
      }
      return false;
    }

    const res = buildNext(0, '');
    if (!res) memo.add(row);
    return res;
  }

  return dfs(bottom);
};

var solve = pyramidTransition;

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

module.exports = solve;
