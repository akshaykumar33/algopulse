var countVowelStrings = function(n) {
  return ((n + 1) * (n + 2) * (n + 3) * (n + 4)) / 24;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(countVowelStrings(JSON.parse(line))));
    }
  }
}

module.exports = countVowelStrings;
