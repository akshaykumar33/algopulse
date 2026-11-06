var reachNumber = function(target) {
  let t = Math.abs(target);
  let k = 0;
  let s = 0;

  while (s < t || (s - t) % 2 !== 0) {
    k++;
    s += k;
  }

  return k;
};

var solve = typeof reachNumber !== 'undefined' ? reachNumber : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const target = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(target)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

