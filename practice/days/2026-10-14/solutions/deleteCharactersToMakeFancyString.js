var makeFancyString = function(s) {
    let res = [];
    for (let i = 0; i < s.length; i++) {
        let n = res.length;
        if (n >= 2 && res[n - 1] === s[i] && res[n - 2] === s[i]) {
            continue;
        }
        res.push(s[i]);
    }
    return res.join('');
};
var solve = makeFancyString;

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
