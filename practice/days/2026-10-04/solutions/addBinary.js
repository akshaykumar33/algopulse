var addBinary = function(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let res = [];
  while (i >= 0 || j >= 0 || carry > 0) {
    let sum = carry;
    if (i >= 0) {
      sum += a.charCodeAt(i) - 48;
      i--;
    }
    if (j >= 0) {
      sum += b.charCodeAt(j) - 48;
      j--;
    }
    res.push(sum % 2);
    carry = Math.floor(sum / 2);
  }
  return res.reverse().join('');
};
var solve = addBinary;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let k = 0; k < lines.length; k += 2) {
        if (k + 1 < lines.length) {
          const a = JSON.parse(lines[k]);
          const b = JSON.parse(lines[k + 1]);
          console.log(JSON.stringify(solve(a, b)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
