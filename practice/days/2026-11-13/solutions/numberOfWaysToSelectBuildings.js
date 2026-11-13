var numberOfWays = function(s) {
  let tot0 = 0;
  let tot1 = 0;
  const n = s.length;
  for (let i = 0; i < n; i++) {
    if (s.charCodeAt(i) === 48) tot0++;
    else tot1++;
  }
  let left0 = 0;
  let left1 = 0;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (s.charCodeAt(i) === 48) {
      const right1 = tot1 - left1;
      ans += left1 * right1;
      left0++;
    } else {
      const right0 = tot0 - left0;
      ans += left0 * right0;
      left1++;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(numberOfWays(JSON.parse(line))));
    }
  }
}

module.exports = numberOfWays;
