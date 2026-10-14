var passThePillow = function(n, time) {
  let cycle = 2 * (n - 1);
  let t = time % cycle;
  if (t < n) {
    return t + 1;
  } else {
    return n - (t - (n - 1));
  }
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const n = JSON.parse(lines[i]);
        const time = JSON.parse(lines[i + 1]);
        const result = passThePillow(n, time);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = passThePillow;
