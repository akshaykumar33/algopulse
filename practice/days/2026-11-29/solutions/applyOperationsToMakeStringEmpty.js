var lastNonEmptyString = function(s) {
  const cnt = new Array(26).fill(0), last = new Array(26).fill(-1);
  for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i) - 97; cnt[c]++; last[c] = i; }
  const mx = Math.max(...cnt);
  const idx = [];
  for (let c = 0; c < 26; c++) if (cnt[c] === mx) idx.push(last[c]);
  idx.sort((a, b) => a - b);
  return idx.map(i => s[i]).join('');
};
var solve = lastNonEmptyString;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = lastNonEmptyString;
