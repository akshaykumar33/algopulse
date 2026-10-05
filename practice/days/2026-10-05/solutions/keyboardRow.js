var solve = function(words) {
  const rows = [
    new Set('qwertyuiop'.split('')),
    new Set('asdfghjkl'.split('')),
    new Set('zxcvbnm'.split(''))
  ];
  const ans = [];
  for (const w of words) {
    const lower = w.toLowerCase();
    let found = -1;
    let ok = true;
    for (let i = 0; i < 3; i++) {
      if (rows[i].has(lower[0])) {
        found = i;
        break;
      }
    }
    if (found === -1) continue;
    for (let j = 1; j < lower.length; j++) {
      if (!rows[found].has(lower[j])) {
        ok = false;
        break;
      }
    }
    if (ok) {
      ans.push(w);
    }
  }
  return ans;
};

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
