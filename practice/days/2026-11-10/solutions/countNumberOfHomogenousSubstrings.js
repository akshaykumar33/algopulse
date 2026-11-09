var countHomogenous = function(s) {
  const mod = 1000000007;
  let ans = 0;
  let curLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && s[i] === s[i - 1]) {
      curLen++;
    } else {
      curLen = 1;
    }
    ans = (ans + curLen) % mod;
  }
  return ans;
};

var solve = countHomogenous;

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
