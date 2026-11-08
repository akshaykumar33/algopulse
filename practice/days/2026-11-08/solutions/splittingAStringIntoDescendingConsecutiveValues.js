var splitString = function(s) {
  if (Array.isArray(s)) s = s[0];
  const n = s.length;
  function dfs(idx, prevVal) {
    if (idx === n) return true;
    let cur = 0n;
    for (let i = idx; i < n; i++) {
      cur = cur * 10n + BigInt(s.charCodeAt(i) - 48);
      if (cur === prevVal - 1n) {
        if (dfs(i + 1, cur)) return true;
      }
      if (cur >= prevVal) break;
    }
    return false;
  }
  let firstVal = 0n;
  for (let i = 0; i < n - 1; i++) {
    firstVal = firstVal * 10n + BigInt(s.charCodeAt(i) - 48);
    if (dfs(i + 1, firstVal)) return true;
  }
  return false;
};

var solve = splitString;
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
