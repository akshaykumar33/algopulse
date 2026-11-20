var hasAllCodes = function(s, k) {
  const need = 1 << k;
  if (s.length - k + 1 < need) return false;
  const seen = new Uint8Array(need);
  let count = 0;
  let hash = 0;
  const mask = need - 1;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 1) & mask) | (s.charCodeAt(i) - 48);
    if (i >= k - 1) {
      if (!seen[hash]) {
        seen[hash] = 1;
        count++;
        if (count === need) return true;
      }
    }
  }
  return false;
};

var solve = hasAllCodes;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = hasAllCodes;