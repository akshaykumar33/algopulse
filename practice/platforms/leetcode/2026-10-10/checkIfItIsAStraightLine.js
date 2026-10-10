var checkStraightLine = function(coordinates) {
  const x0 = coordinates[0][0];
  const y0 = coordinates[0][1];
  const dx = coordinates[1][0] - x0;
  const dy = coordinates[1][1] - y0;
  for (let i = 2; i < coordinates.length; i++) {
    const x = coordinates[i][0];
    const y = coordinates[i][1];
    if (dy * (x - x0) !== dx * (y - y0)) {
      return false;
    }
  }
  return true;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = checkStraightLine(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(checkStraightLine(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = checkStraightLine;
