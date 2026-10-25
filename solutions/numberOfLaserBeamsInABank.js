var numberOfBeams = function(bank) {
  let ans = 0, prev = 0;
  for (let i = 0; i < bank.length; i++) {
    let cnt = 0;
    const s = bank[i];
    for (let j = 0; j < s.length; j++) {
      if (s[j] === '1') cnt++;
    }
    if (cnt > 0) {
      ans += prev * cnt;
      prev = cnt;
    }
  }
  return ans;
};

var solve = numberOfBeams;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const bank = JSON.parse(lines[i]);
        const result = solve(bank);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = numberOfBeams;
