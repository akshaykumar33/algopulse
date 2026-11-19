var countCompleteDayPairs = function(hours) {
  const cnt = new Int32Array(24);
  let ans = 0;
  for (let i = 0; i < hours.length; i++) {
    const r = hours[i] % 24;
    const comp = (24 - r) % 24;
    ans += cnt[comp];
    cnt[r]++;
  }
  return ans;
};

var solve = countCompleteDayPairs;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const arg = Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(arg)));
    }
  } catch (e) {}
}

module.exports = countCompleteDayPairs;
