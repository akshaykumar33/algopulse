var soupServings = function(n) {
  if (n >= 4800) return 1.0;
  const m = Math.ceil(n / 25);
  const memo = new Map();
  function f(a, b) {
    if (a <= 0 && b <= 0) return 0.5;
    if (a <= 0) return 1.0;
    if (b <= 0) return 0.0;
    const key = (a << 11) | b;
    if (memo.has(key)) return memo.get(key);
    const res = 0.25 * (f(a - 4, b) + f(a - 3, b - 1) + f(a - 2, b - 2) + f(a - 1, b - 3));
    memo.set(key, res);
    return res;
  }
  return f(m, m);
};

var solve = typeof soupServings !== 'undefined' ? soupServings : null;

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
module.exports = { soupServings, solve };
