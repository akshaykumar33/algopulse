var minNumberOfFrogs = function(croakOfFrogs) {
  let c = 0;
  let r = 0;
  let o = 0;
  let a = 0;
  let active = 0;
  let maxActive = 0;
  for (let i = 0; i < croakOfFrogs.length; i++) {
    const ch = croakOfFrogs[i];
    if (ch === 'c') {
      c++;
      active++;
      if (active > maxActive) maxActive = active;
    } else if (ch === 'r') {
      if (c === 0) return -1;
      c--;
      r++;
    } else if (ch === 'o') {
      if (r === 0) return -1;
      r--;
      o++;
    } else if (ch === 'a') {
      if (o === 0) return -1;
      o--;
      a++;
    } else if (ch === 'k') {
      if (a === 0) return -1;
      a--;
      active--;
    } else {
      return -1;
    }
  }
  if (active !== 0 || c !== 0 || r !== 0 || o !== 0 || a !== 0) return -1;
  return maxActive;
};

var solve = minNumberOfFrogs;

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
