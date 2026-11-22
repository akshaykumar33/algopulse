var longestPalindrome = function(s, t) {
  const n = s.length, m = t.length;
  function isPal(str) {
    let l = 0, r = str.length - 1;
    while (l < r) {
      if (str[l] !== str[r]) return false;
      l++;
      r--;
    }
    return true;
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const sub = s.slice(i, j + 1);
      if (isPal(sub)) ans = Math.max(ans, sub.length);
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = i; j < m; j++) {
      const sub = t.slice(i, j + 1);
      if (isPal(sub)) ans = Math.max(ans, sub.length);
    }
  }
  for (let i1 = 0; i1 < n; i1++) {
    for (let j1 = i1; j1 < n; j1++) {
      const sub1 = s.slice(i1, j1 + 1);
      for (let i2 = 0; i2 < m; i2++) {
        for (let j2 = i2; j2 < m; j2++) {
          const sub2 = t.slice(i2, j2 + 1);
          if (sub1.length + sub2.length > ans) {
            if (isPal(sub1 + sub2)) ans = sub1.length + sub2.length;
          }
        }
      }
    }
  }
  return ans;
};
var solve = longestPalindrome;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}
module.exports = longestPalindrome;