var nextGreaterElement = function(n) {
  const digits = String(n).split('');
  const len = digits.length;
  let i = len - 2;
  while (i >= 0 && digits[i] >= digits[i + 1]) {
    i--;
  }

  if (i < 0) return -1;

  let j = len - 1;
  while (digits[j] <= digits[i]) {
    j--;
  }

  const tmp = digits[i];
  digits[i] = digits[j];
  digits[j] = tmp;

  let l = i + 1, r = len - 1;
  while (l < r) {
    const t = digits[l];
    digits[l] = digits[r];
    digits[r] = t;
    l++;
    r--;
  }

  const ans = parseInt(digits.join(''), 10);
  if (ans > 2147483647) return -1;
  return ans;
};

var solve = function(n) {
  return nextGreaterElement(Number(n));
};

// ---------------- LOCAL TEST HARNESS ----------------
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

