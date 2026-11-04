var smallestEquivalentString = function(s1, s2, baseStr) {
  const parent = new Int32Array(26);
  for (let i = 0; i < 26; i++) parent[i] = i;

  function find(i) {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]];
      i = parent[i];
    }
    return i;
  }

  function union(u, v) {
    const ru = find(u);
    const rv = find(v);
    if (ru === rv) return;
    if (ru < rv) parent[rv] = ru;
    else parent[ru] = rv;
  }

  for (let i = 0; i < s1.length; i++) {
    union(s1.charCodeAt(i) - 97, s2.charCodeAt(i) - 97);
  }

  const res = [];
  for (let i = 0; i < baseStr.length; i++) {
    const root = find(baseStr.charCodeAt(i) - 97);
    res.push(String.fromCharCode(root + 97));
  }

  return res.join('');
};

var lexicographicallySmallestEquivalentString = smallestEquivalentString;
var solve = typeof lexicographicallySmallestEquivalentString !== 'undefined' ? lexicographicallySmallestEquivalentString : null;

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

