var miceAndCheese = function(reward1, reward2, k) {
  const n = reward1.length;
  let ans = 0;
  const diffs = new Array(n);
  for (let i = 0; i < n; i++) {
    ans += reward2[i];
    diffs[i] = reward1[i] - reward2[i];
  }
  diffs.sort((a, b) => b - a);
  for (let i = 0; i < k; i++) {
    ans += diffs[i];
  }
  return ans;
};

var solve = miceAndCheese;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 2 < lines.length; i += 3) {
      const reward1 = JSON.parse(lines[i]);
      const reward2 = JSON.parse(lines[i + 1]);
      const k = JSON.parse(lines[i + 2]);
      out.push(JSON.stringify(miceAndCheese(reward1, reward2, k)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = miceAndCheese;
