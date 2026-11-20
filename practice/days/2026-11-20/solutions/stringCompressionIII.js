var compressedString = function(word) {
  let comp = '';
  let i = 0, n = word.length;
  while (i < n) {
    let c = word[i], count = 0;
    while (i < n && word[i] === c && count < 9) {
      count++;
      i++;
    }
    comp += count + c;
  }
  return comp;
};

var solve = compressedString;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = compressedString;