var findArray = function(pref) {
  const n = pref.length;
  const res = new Array(n);
  res[0] = pref[0];
  for (let i = 1; i < n; i++) {
    res[i] = pref[i - 1] ^ pref[i];
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(findArray(JSON.parse(line))));
    }
  }
}

module.exports = findArray;
