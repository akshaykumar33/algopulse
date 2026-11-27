var countSubstrings = function(s, c) {
  let count = 0n;
  for (let i = 0; i < s.length; i++) if (s[i] === c) count++;
  return Number((count * (count + 1n)) / 2n);
};
var solve = countSubstrings;
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
module.exports = countSubstrings;
