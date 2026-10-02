var restoreString = function(s, indices) {
  const n = s.length;
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[indices[i]] = s[i];
  }
  return res.join('');
};

var solve = function(s, indices) {
  return restoreString(s, indices);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const s = JSON.parse(lines[i]);
          const indices = JSON.parse(lines[i+1]);
          const result = solve(s, indices);
          console.log(JSON.stringify(result));
        } catch {}
      }
    }
  } catch (err) {}
}

module.exports = solve;
