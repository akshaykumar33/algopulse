var findTheStudentThatWillReplaceTheChalk = function(chalk, k) {
    let sum = 0;
    for (let i = 0; i < chalk.length; i++) {
        sum += chalk[i];
    }
    k %= sum;
    for (let i = 0; i < chalk.length; i++) {
        if (k < chalk[i]) {
            return i;
        }
        k -= chalk[i];
    }
    return 0;
};
var solve = typeof findTheStudentThatWillReplaceTheChalk !== 'undefined' ? findTheStudentThatWillReplaceTheChalk : null;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const chalk = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const result = solve(chalk, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
