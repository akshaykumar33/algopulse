var findMinDifference = function(timePoints) {
    const minutes = [];
    for (const t of timePoints) {
        const [h, m] = t.split(':').map(Number);
        minutes.push(h * 60 + m);
    }
    minutes.sort((a, b) => a - b);
    let ans = 1440 - minutes[minutes.length - 1] + minutes[0];
    for (let i = 1; i < minutes.length; i++) {
        ans = Math.min(ans, minutes[i] - minutes[i - 1]);
    }
    return ans;
};
var minimumTimeDifference = findMinDifference;
var solve = findMinDifference;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(solve(parsed)));
    }
  }
}
module.exports = solve;
