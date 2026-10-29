var validUtf8 = function(data) {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    const byte = data[i];
    if (count === 0) {
      if ((byte >> 5) === 0b110) {
        count = 1;
      } else if ((byte >> 4) === 0b1110) {
        count = 2;
      } else if ((byte >> 3) === 0b11110) {
        count = 3;
      } else if ((byte >> 7) !== 0) {
        return false;
      }
    } else {
      if ((byte >> 6) !== 0b10) {
        return false;
      }
      count--;
    }
  }
  return count === 0;
};

var solve = typeof validUtf8 !== 'undefined' ? validUtf8 : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
