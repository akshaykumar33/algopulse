var findOriginalArray = function(changed) {
  if (changed.length % 2 !== 0) return [];
  changed.sort((a, b) => a - b);
  const freq = new Int32Array(200005);
  for (let i = 0; i < changed.length; i++) {
    freq[changed[i]]++;
  }
  const res = [];
  for (let i = 0; i < changed.length; i++) {
    const x = changed[i];
    if (freq[x] === 0) continue;
    freq[x]--;
    const d = x * 2;
    if (d > 200000 || freq[d] === 0) return [];
    freq[d]--;
    res.push(x);
  }
  return res;
};

var solve = findOriginalArray;

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

