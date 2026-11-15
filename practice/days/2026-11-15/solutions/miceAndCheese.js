var miceAndCheese = function(reward1, reward2, k) {
  const n = reward1.length;
  let ans = 0;
  const diffs = [];

  for (let i = 0; i < n; i++) {
    ans += reward2[i];
    diffs.push(reward1[i] - reward2[i]);
  }

  diffs.sort((a, b) => b - a);
  for (let i = 0; i < k; i++) {
    ans += diffs[i];
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 3) {
      console.log(JSON.stringify(miceAndCheese(JSON.parse(lines[i]), JSON.parse(lines[i + 1]), JSON.parse(lines[i + 2]))));
    }
  }
}

module.exports = miceAndCheese;
