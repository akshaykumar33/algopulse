var minimumSteps = function(s) {
  let ones = 0;
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') {
      ones++;
    } else {
      ans += ones;
    }
  }
  return ans;
};

var solve = minimumSteps;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const s = JSON.parse(lines[i]);
      out.push(JSON.stringify(minimumSteps(s)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = minimumSteps;
