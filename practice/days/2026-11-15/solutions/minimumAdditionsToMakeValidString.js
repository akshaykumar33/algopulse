var addMinimum = function(word) {
  let cycles = 1;
  for (let i = 1; i < word.length; i++) {
    if (word[i] <= word[i - 1]) cycles++;
  }
  return cycles * 3 - word.length;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(addMinimum(JSON.parse(lines[i]))));
    }
  }
}

module.exports = addMinimum;
