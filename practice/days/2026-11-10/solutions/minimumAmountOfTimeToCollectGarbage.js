var garbageCollection = function(garbage, travel) {
  const n = garbage.length;
  let totalTime = 0;
  let lastM = 0;
  let lastP = 0;
  let lastG = 0;
  for (let i = 0; i < n; i++) {
    const s = garbage[i];
    totalTime += s.length;
    for (let j = 0; j < s.length; j++) {
      const c = s[j];
      if (c === 'M') lastM = i;
      else if (c === 'P') lastP = i;
      else if (c === 'G') lastG = i;
    }
  }
  const pref = new Int32Array(n);
  for (let i = 0; i < travel.length; i++) {
    pref[i + 1] = pref[i] + travel[i];
  }
  totalTime += pref[lastM] + pref[lastP] + pref[lastG];
  return totalTime;
};

var solve = garbageCollection;

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
