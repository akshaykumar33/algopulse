var solve = function(jewels, stones) {
  const set = new Set(jewels);
  let ans = 0;
  for (let i = 0; i < stones.length; i++) {
    if (set.has(stones[i])) {
      ans++;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const jewels = JSON.parse(lines[i]);
        const stones = JSON.parse(lines[i + 1]);
        const result = solve(jewels, stones);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
