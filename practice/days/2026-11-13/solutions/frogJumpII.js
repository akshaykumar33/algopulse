var maxJump = function(stones) {
  let ans = stones[1] - stones[0];
  for (let i = 2; i < stones.length; i++) {
    const diff = stones[i] - stones[i - 2];
    if (diff > ans) ans = diff;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(maxJump(JSON.parse(line))));
    }
  }
}

module.exports = maxJump;
