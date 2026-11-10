var getFolderNames = function(names) {
  const map = new Map();
  const n = names.length;
  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    const name = names[i];
    if (!map.has(name)) {
      map.set(name, 1);
      ans[i] = name;
    } else {
      let k = map.get(name);
      let newName = name + '(' + k + ')';
      while (map.has(newName)) {
        k++;
        newName = name + '(' + k + ')';
      }
      map.set(name, k + 1);
      map.set(newName, 1);
      ans[i] = newName;
    }
  }
  return ans;
};

var solve = getFolderNames;

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
