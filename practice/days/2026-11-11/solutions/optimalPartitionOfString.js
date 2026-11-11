var partitionString = function(s) {
  let ans = 1;
  let mask = 0;
  for (let i = 0; i < s.length; i++) {
    const bit = 1 << (s.charCodeAt(i) - 97);
    if ((mask & bit) !== 0) {
      ans++;
      mask = bit;
    } else {
      mask |= bit;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(partitionString(JSON.parse(line))));
    }
  }
}

module.exports = partitionString;
