var decodeAtIndex = function(s, k) {
  let size = 0, i = 0;
  for (; i < s.length; i++) {
    const c = s[i];
    if (c >= '0' && c <= '9') size *= +c;
    else size++;
    if (size >= k) break;
  }
  for (; i >= 0; i--) {
    const c = s[i];
    if (c >= '0' && c <= '9') {
      size /= +c;
      k %= size;
    } else {
      if (k === 0 || k === size) return c;
      size--;
    }
  }
  return '';
};
var solve = decodeAtIndex;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = decodeAtIndex;
