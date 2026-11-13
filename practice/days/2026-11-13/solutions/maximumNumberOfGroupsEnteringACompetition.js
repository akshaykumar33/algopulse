var maximumGroups = function(grades) {
  const n = grades.length;
  return Math.floor((Math.sqrt(1 + 8 * n) - 1) / 2);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(maximumGroups(JSON.parse(line))));
    }
  }
}

module.exports = maximumGroups;
