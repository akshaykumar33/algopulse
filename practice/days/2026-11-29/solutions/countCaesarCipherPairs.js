var countPairs = function(words) {
  const cnt = new Map();
  let ans = 0;
  for (const w of words) {
    const d = w.charCodeAt(0);
    const arr = new Array(w.length);
    for (let i = 0; i < w.length; i++) arr[i] = String.fromCharCode(97 + (w.charCodeAt(i) - d + 26) % 26);
    const key = arr.join('');
    const c = cnt.get(key) || 0;
    ans += c;
    cnt.set(key, c + 1);
  }
  return ans;
};
var solve = countPairs;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = countPairs;
