var maximumHappinessSum = function(happiness, k) {
  happiness.sort((a, b) => b - a);
  let ans = 0;
  for (let i = 0; i < k; i++) {
    let val = happiness[i] - i;
    if (val > 0) ans += val;
    else break;
  }
  return ans;
};

var solve = maximumHappinessSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const happiness = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = solve(happiness, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = maximumHappinessSum;
