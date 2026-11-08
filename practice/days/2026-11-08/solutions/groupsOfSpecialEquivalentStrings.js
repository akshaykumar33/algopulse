var numSpecialEquivGroups = function(words) {
  if (Array.isArray(words) && words.length === 1 && Array.isArray(words[0])) {
    words = words[0];
  }
  const set = new Set();
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const even = new Uint8Array(26);
    const odd = new Uint8Array(26);
    for (let j = 0; j < w.length; j++) {
      const code = w.charCodeAt(j) - 97;
      if (j % 2 === 0) even[code]++;
      else odd[code]++;
    }
    const key = even.join(',') + '#' + odd.join(',');
    set.add(key);
  }
  return set.size;
};

var solve = numSpecialEquivGroups;
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
