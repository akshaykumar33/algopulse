var magicalString = function(n) {
    if (n <= 0) return 0;
    if (n <= 3) return 1;
    const s = [1, 2, 2];
    let head = 2;
    let nextVal = 1;
    while (s.length < n) {
        const count = s[head];
        for (let i = 0; i < count; i++) {
            s.push(nextVal);
        }
        nextVal = 3 - nextVal;
        head++;
    };
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === 1) ans++;
    }
    return ans;
};
var solve = magicalString;
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
