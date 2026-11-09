var minFlips = function(target) {
  let ans = 0;
  let cur = '0';
  for (let i = 0; i < target.length; i++) {
    if (target[i] !== cur) {
      ans++;
      cur = target[i];
    }
  }
  return ans;
};

var solve = minFlips;

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
