var minimizeStringValue = function(s) {
  const cnt = new Array(26).fill(0);
  let q = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '?') q++;
    else cnt[s.charCodeAt(i) - 97]++;
  }
  const add = new Array(26).fill(0);
  for (let t = 0; t < q; t++) {
    let b = 0;
    for (let c = 1; c < 26; c++) if (cnt[c] < cnt[b]) b = c;
    cnt[b]++;
    add[b]++;
  }
  const res = s.split('');
  let c = 0;
  for (let i = 0; i < res.length; i++) {
    if (res[i] !== '?') continue;
    while (add[c] === 0) c++;
    res[i] = String.fromCharCode(97 + c);
    add[c]--;
  }
  return res.join('');
};
var solve = minimizeStringValue;
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
module.exports = minimizeStringValue;
