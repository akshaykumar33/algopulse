var solve = function(left, right) {
  let ans = [];
  for (let i = left; i <= right; i++) {
    if (isSelfDividing(i)) {
      ans.push(i);
    }
  }
  return ans;
};

function isSelfDividing(num) {
  let temp = num;
  while (temp > 0) {
    let digit = temp % 10;
    if (digit === 0 || num % digit !== 0) {
      return false;
    }
    temp = Math.floor(temp / 10);
  }
  return true;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const left = JSON.parse(lines[i]);
        const right = JSON.parse(lines[i + 1]);
        const result = solve(left, right);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
