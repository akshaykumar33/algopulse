var nthPersonGetsNthSeat = function(n) {
  return n === 1 ? 1.0 : 0.5;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(nthPersonGetsNthSeat(JSON.parse(lines[i])).toFixed(5));
    }
  }
}

module.exports = nthPersonGetsNthSeat;
