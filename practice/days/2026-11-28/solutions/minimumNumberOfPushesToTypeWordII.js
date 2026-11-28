var minimumPushes = function(word) {
  const cnt = new Array(26).fill(0);
  for (let i = 0; i < word.length; i++) cnt[word.charCodeAt(i) - 97]++;
  cnt.sort((a, b) => b - a);
  let ans = 0;
  for (let i = 0; i < 26; i++) ans += cnt[i] * (Math.floor(i / 8) + 1);
  return ans;
};
var solve = minimumPushes;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minimumPushes;
