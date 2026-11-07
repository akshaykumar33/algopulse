var getSmallestString = function(n, k) {
  let rem = k - n;
  const ans = new Array(n).fill('a');
  for (let i = n - 1; i >= 0 && rem > 0; i--) {
    const add = Math.min(25, rem);
    ans[i] = String.fromCharCode(97 + add);
    rem -= add;
  }
  return ans.join('');
};

var solve = typeof getSmallestString !== 'undefined' ? getSmallestString : null;

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
module.exports = { getSmallestString, solve };
