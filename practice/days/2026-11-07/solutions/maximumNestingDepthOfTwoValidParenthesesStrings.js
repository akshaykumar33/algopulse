var maxDepthAfterSplit = function(seq) {
  const ans = new Int32Array(seq.length);
  let d = 0;
  for (let i = 0; i < seq.length; i++) {
    if (seq[i] === '(') {
      ans[i] = d % 2;
      d++;
    } else {
      d--;
      ans[i] = d % 2;
    }
  }
  return Array.from(ans);
};

var solve = typeof maxDepthAfterSplit !== 'undefined' ? maxDepthAfterSplit : null;

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
module.exports = { maxDepthAfterSplit, solve };
