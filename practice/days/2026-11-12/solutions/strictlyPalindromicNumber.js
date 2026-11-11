var isStrictlyPalindromic = function(n) {
  return false;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(isStrictlyPalindromic(JSON.parse(line))));
    }
  }
}

module.exports = isStrictlyPalindromic;
