var numSub = function(s) {
  const mod = 1000000007;
  let ans = 0;
  let cnt = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) === 49) {
      cnt++;
      ans = (ans + cnt) % mod;
    } else {
      cnt = 0;
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
      console.log(JSON.stringify(numSub(JSON.parse(line))));
    }
  }
}

module.exports = numSub;
