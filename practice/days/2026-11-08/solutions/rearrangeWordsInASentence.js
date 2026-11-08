var arrangeWords = function(text) {
  const words = text.toLowerCase().split(' ');
  words.sort((a, b) => a.length - b.length);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(' ');
};

var solve = arrangeWords;
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
