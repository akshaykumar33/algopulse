var findDuplicate = function(paths) {
    const map = new Map();
    for (const p of paths) {
        const parts = p.split(' ');
        const dir = parts[0];
        for (let i = 1; i < parts.length; i++) {
            const file = parts[i];
            const idx = file.indexOf('(');
            const name = file.substring(0, idx);
            const content = file.substring(idx + 1, file.length - 1);
            const full = dir + '/' + name;
            if (!map.has(content)) {
                map.set(content, []);
            }
            map.get(content).push(full);
        }
    }
    const res = [];
    for (const [, list] of map) {
        if (list.length > 1) {
            res.push(list);
        }
    }
    return res;
};
var findDuplicateFileInSystem = findDuplicate;
var solve = findDuplicate;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(solve(parsed)));
    }
  }
}
module.exports = solve;
