var getHappyString = function(n, k) {
    let chars = ['a', 'b', 'c'];
    let res = [];
    function dfs(cur) {
        if (cur.length === n) {
            res.push(cur);
            return;
        }
        for (let c of chars) {
            if (cur.length > 0 && cur[cur.length - 1] === c) continue;
            dfs(cur + c);
        }
    }
    dfs('');
    return res.length >= k ? res[k - 1] : "";
};
var theKThLexicographicalStringOfAllHappyStringsOfLengthN = getHappyString;
var solve = getHappyString;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const n = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = solve(n, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
