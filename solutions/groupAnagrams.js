var groupAnagrams = function(strs) {
    const map = new Map();
    for (let i = 0; i < strs.length; i++) {
        const s = strs[i];
        const count = new Array(26).fill(0);
        for (let j = 0; j < s.length; j++) {
            count[s.charCodeAt(j) - 97]++;
        }
        const key = count.join('#');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(s);
    }
    return Array.from(map.values());
};
var solve = groupAnagrams;

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
