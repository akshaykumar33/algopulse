var solve = function(mat) {
  if (!mat || mat.length === 0 || mat[0].length === 0) return [];
  let m = mat.length;
  let n = mat[0].length;
  let res = [];
  let r = 0, c = 0;
  let d = 1;
  for (let i = 0; i < m * n; i++) {
    res.push(mat[r][c]);
    if (d === 1) {
      if (c === n - 1) {
        r++;
        d = -1;
      } else if (r === 0) {
        c++;
        d = -1;
      } else {
        r--;
        c++;
      }
    } else {
      if (r === m - 1) {
        c++;
        d = 1;
      } else if (c === 0) {
        r++;
        d = 1;
      } else {
        r++;
        c--;
      }
    }
  }
  return res;
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
