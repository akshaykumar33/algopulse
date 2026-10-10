var isOneBitCharacter = function(bits) {
  let i = 0;
  const n = bits.length;
  while (i < n - 1) {
    if (bits[i] === 1) {
      i += 2;
    } else {
      i += 1;
    }
  }
  return i === n - 1;
};

var solve = isOneBitCharacter;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
