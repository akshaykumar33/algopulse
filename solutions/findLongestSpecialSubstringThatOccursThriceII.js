var maximumLength = function(s) {
  const n = s.length;
  const lens = [];
  for (let c = 0; c < 26; c++) lens.push([]);
  let i = 0;
  while (i < n) {
    const c = s.charCodeAt(i) - 97;
    let j = i;
    while (j < n && s[j] === s[i]) j++;
    lens[c].push(j - i);
    i = j;
  }
  let ans = -1;
  for (let c = 0; c < 26; c++) {
    if (lens[c].length === 0) continue;
    lens[c].sort((a, b) => b - a);
    const arr = lens[c];
    if (arr[0] >= 3) ans = Math.max(ans, arr[0] - 2);
    if (arr.length >= 2) {
      if (arr[0] === arr[1]) {
        ans = Math.max(ans, arr[0] - 1);
      } else {
        ans = Math.max(ans, Math.min(arr[0] - 1, arr[1]));
      }
    }
    if (arr.length >= 3) {
      ans = Math.max(ans, arr[2]);
    }
  }
  return ans === 0 ? -1 : ans;
};
var solve = maximumLength;
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
module.exports = maximumLength;
