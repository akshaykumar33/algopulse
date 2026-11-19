var shiftingLetters = function(s, shifts) {
  const n = s.length;
  const chars = s.split('');
  let curShift = 0;

  for (let i = n - 1; i >= 0; i--) {
    curShift = (curShift + shifts[i]) % 26;
    const code = s.charCodeAt(i) - 97;
    chars[i] = String.fromCharCode(((code + curShift) % 26) + 97);
  }

  return chars.join('');
};

var solve = shiftingLetters;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = shiftingLetters;
