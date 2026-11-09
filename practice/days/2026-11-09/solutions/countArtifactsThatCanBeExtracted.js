var digArtifacts = function(n, artifacts, dig) {
  const dug = new Uint8Array(n * n);
  for (let i = 0; i < dig.length; i++) {
    dug[dig[i][0] * n + dig[i][1]] = 1;
  }
  let ans = 0;
  for (let i = 0; i < artifacts.length; i++) {
    const art = artifacts[i];
    let ok = 1;
    for (let r = art[0]; r <= art[2] && ok; r++) {
      for (let c = art[1]; c <= art[3]; c++) {
        if (!dug[r * n + c]) {
          ok = 0;
          break;
        }
      }
    }
    if (ok) ans++;
  }
  return ans;
};

var solve = digArtifacts;

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
  } catch (err) {}
}
module.exports = solve;
