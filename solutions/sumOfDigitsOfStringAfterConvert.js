var getLucky = function(s, k) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    let val = s.charCodeAt(i) - 96;
    sum += Math.floor(val / 10) + (val % 10);
  }
  while (--k > 0) {
    let nxt = 0;
    while (sum > 0) {
      nxt += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = nxt;
  }
  return sum;
};
var solve = getLucky;

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
