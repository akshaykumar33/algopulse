var maxDiff = function(num) {
  const s = num.toString();
  let maxVal = num;
  let minVal = num;

  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      if (x === y) continue;
      const xChar = x.toString();
      const yChar = y.toString();

      if (s[0] === xChar && y === 0) continue;

      let transformed = '';
      for (let i = 0; i < s.length; i++) {
        transformed += s[i] === xChar ? yChar : s[i];
      }

      const val = parseInt(transformed, 10);
      if (val > maxVal) maxVal = val;
      if (val < minVal) minVal = val;
    }
  }

  return maxVal - minVal;
};

var solve = typeof maxDiff !== 'undefined' ? maxDiff : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const num = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(num)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

