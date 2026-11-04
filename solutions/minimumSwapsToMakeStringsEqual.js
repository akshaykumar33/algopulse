var minimumSwapsToMakeStringsEqual = function(s1, s2) {
  let xy = 0;
  let yx = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] === 'x' && s2[i] === 'y') xy++;
    else if (s1[i] === 'y' && s2[i] === 'x') yx++;
  }
  if ((xy + yx) % 2 !== 0) return -1;
  return Math.floor(xy / 2) + Math.floor(yx / 2) + (xy % 2) * 2;
};

var solve = typeof minimumSwapsToMakeStringsEqual !== 'undefined' ? minimumSwapsToMakeStringsEqual : null;

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
