var solve = function(num1, num2) {
  let cnt = 0;
  while (num1 > 0 && num2 > 0) {
    if (num1 >= num2) {
      cnt += Math.floor(num1 / num2);
      num1 %= num2;
    } else {
      cnt += Math.floor(num2 / num1);
      num2 %= num1;
    }
  }
  return cnt;
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
