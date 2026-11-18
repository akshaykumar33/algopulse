var largestPalindromic = function(num) {
  const count = new Int32Array(10);
  for (let i = 0; i < num.length; i++) {
    count[num.charCodeAt(i) - 48]++;
  }

  let left = '';
  for (let d = 9; d >= 1; d--) {
    const pairs = count[d] >> 1;
    if (pairs > 0) {
      left += String(d).repeat(pairs);
      count[d] -= pairs * 2;
    }
  }

  if (left.length > 0) {
    const zeroPairs = count[0] >> 1;
    if (zeroPairs > 0) {
      left += '0'.repeat(zeroPairs);
      count[0] -= zeroPairs * 2;
    }
  }

  let mid = '';
  for (let d = 9; d >= 0; d--) {
    if (count[d] > 0) {
      mid = String(d);
      break;
    }
  }

  if (left.length === 0) return mid.length > 0 ? mid : '0';
  return left + mid + left.split('').reverse().join('');
};

var solve = largestPalindromic;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = largestPalindromic;
