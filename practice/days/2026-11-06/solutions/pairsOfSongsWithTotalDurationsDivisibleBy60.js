var numPairsDivisibleBy60 = function(time) {
  const cnt = new Int32Array(60);
  let ans = 0;

  for (let i = 0; i < time.length; i++) {
    const rem = time[i] % 60;
    const target = (60 - rem) % 60;
    ans += cnt[target];
    cnt[rem]++;
  }

  return ans;
};

var solve = typeof numPairsDivisibleBy60 !== 'undefined' ? numPairsDivisibleBy60 : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const time = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(time)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

