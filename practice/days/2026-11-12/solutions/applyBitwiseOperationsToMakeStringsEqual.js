var makeStringsEqual = function(s, target) {
  return (s.indexOf('1') !== -1) === (target.indexOf('1') !== -1);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && typeof p[0] === 'string';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(makeStringsEqual(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(makeStringsEqual(...args)));
      }
    }
  }
}

module.exports = makeStringsEqual;
