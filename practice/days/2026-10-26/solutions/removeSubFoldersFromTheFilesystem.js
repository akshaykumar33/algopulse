var removeSubfolders = function(folder) {
    folder.sort();
    const ans = [];
    let prev = "";
    for (const f of folder) {
        if (prev === "" || !f.startsWith(prev) || f[prev.length] !== '/') {
            ans.push(f);
            prev = f;
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
          const result = Array.isArray(parsed) && removeSubfolders.length > 1 ? removeSubfolders(...parsed) : removeSubfolders(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(removeSubfolders(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = removeSubfolders;
