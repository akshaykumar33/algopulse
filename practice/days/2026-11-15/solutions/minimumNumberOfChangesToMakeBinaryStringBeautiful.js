var minChanges = function(s) {
  let ans = 0;
  for (let i = 0; i < s.length; i += 2) {
    if (s[i] !== s[i + 1]) ans++;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(minChanges(JSON.parse(lines[i]))));
    }
  }
}

module.exports = minChanges;
