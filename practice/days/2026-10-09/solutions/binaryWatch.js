var readBinaryWatch = function(turnedOn) {
  let ans = [];
  for (let h = 0; h < 12; h++) {
    for (let m = 0; m < 60; m++) {
      if (countSetBits(h) + countSetBits(m) === turnedOn) {
        let mStr = m < 10 ? "0" + m : m;
        ans.push(h + ":" + mStr);
      }
    }
  }
  return ans;
};

function countSetBits(num) {
  let cnt = 0;
  while (num > 0) {
    cnt += num & 1;
    num >>= 1;
  }
  return cnt;
}

var solve = readBinaryWatch;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
