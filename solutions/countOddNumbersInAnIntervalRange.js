var solve = function(low, high) {
  let cnt = Math.floor((high - low) / 2);
  if (low % 2 !== 0 || high % 2 !== 0) {
    cnt++;
  }
  return cnt;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const low = JSON.parse(lines[i]);
        const high = JSON.parse(lines[i + 1]);
        const result = solve(low, high);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
