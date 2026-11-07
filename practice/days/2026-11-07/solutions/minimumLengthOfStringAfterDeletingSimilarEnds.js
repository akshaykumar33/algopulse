var minimumLength = function(s) {
  let l = 0, r = s.length - 1;
  while (l < r && s[l] === s[r]) {
    const c = s[l];
    while (l <= r && s[l] === c) l++;
    while (l <= r && s[r] === c) r--;
  }
  return Math.max(0, r - l + 1);
};

var solve = minimumLength;

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
