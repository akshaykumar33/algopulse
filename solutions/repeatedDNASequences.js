var findRepeatedDnaSequences = function(s) {
  if (s.length <= 10) return [];
  const seen = new Set();
  const repeated = new Set();

  for (let i = 0; i <= s.length - 10; i++) {
    const sub = s.substring(i, i + 10);
    if (seen.has(sub)) {
      repeated.add(sub);
    } else {
      seen.add(sub);
    }
  }

  return Array.from(repeated);
};

var solve = findRepeatedDnaSequences;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const s = JSON.parse(lines[i]);
        const result = solve(s);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = findRepeatedDnaSequences;
