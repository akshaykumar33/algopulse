var solve = function(num, k) {
  let ans = [];
  let i = num.length - 1;
  let carry = 0;
  while (i >= 0 || k > 0 || carry > 0) {
    let sum = carry;
    if (i >= 0) {
      sum += num[i];
      i--;
    }
    if (k > 0) {
      sum += k % 10;
      k = Math.floor(k / 10);
    }
    carry = Math.floor(sum / 10);
    ans.push(sum % 10);
  }
  return ans.reverse();
};

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
