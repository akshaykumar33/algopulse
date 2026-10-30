var reverse = function(x) {
  const sign = x < 0 ? -1 : 1;
  const rev = parseInt(Math.abs(x).toString().split('').reverse().join(''), 10) * sign;
  if (rev < -2147483648 || rev > 2147483647) return 0;
  return rev;
};

var solve = function(x) {
  return reverse(x);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
