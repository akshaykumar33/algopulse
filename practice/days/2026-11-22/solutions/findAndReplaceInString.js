var findReplaceString = function(s, indices, sources, targets) {
  const k = indices.length;
  const match = new Map();
  for (let i = 0; i < k; i++) {
    const idx = indices[i];
    const src = sources[i];
    if (s.slice(idx, idx + src.length) === src) {
      match.set(idx, { srcLen: src.length, target: targets[i] });
    }
  }
  let res = '';
  let i = 0;
  while (i < s.length) {
    if (match.has(i)) {
      const item = match.get(i);
      res += item.target;
      i += item.srcLen;
    } else {
      res += s[i];
      i++;
    }
  }
  return res;
};
var solve = findReplaceString;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2], parsed[3])));
    }
  } catch (e) {}
}
module.exports = findReplaceString;