var partition = function(s) {
  const res = [];
  const path = [];
  function isPal(str, l, r) {
    while (l < r) {
      if (str[l++] !== str[r--]) return false;
    }
    return true;
  }
  function dfs(start) {
    if (start === s.length) {
      res.push([...path]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(s, start, end)) {
        path.push(s.slice(start, end + 1));
        dfs(end + 1);
        path.pop();
      }
    }
  }
  dfs(0);
  return res;
};

var solve = function(s) {
  return partition(s);
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
