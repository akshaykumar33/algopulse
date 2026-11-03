var removeComments = function(source) {
    let inBlock = false;
    const res = [];
    let newLine = [];
    for (const line of source) {
        let i = 0;
        const len = line.length;
        while (i < len) {
            if (!inBlock) {
                if (i + 1 < len && line[i] === '/' && line[i + 1] === '/') {
                    break;
                } else if (i + 1 < len && line[i] === '/' && line[i + 1] === '*') {
                    inBlock = true;
                    i += 2;
                } else {
                    newLine.push(line[i++]);
                }
            } else {
                if (i + 1 < len && line[i] === '*' && line[i + 1] === '/') {
                    inBlock = false;
                    i += 2;
                } else {
                    i++;
                }
            }
        }
        if (!inBlock && newLine.length > 0) {
            res.push(newLine.join(''));
            newLine = [];
        }
    }
    return res;
};
var solve = typeof removeComments !== 'undefined' ? removeComments : null;
module.exports = solve;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const arg = JSON.parse(line);
        const result = solve(arg);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
