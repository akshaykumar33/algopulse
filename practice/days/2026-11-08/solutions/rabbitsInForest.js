var numRabbits = function(answers) {
  const cnt = new Map();
  for (let i = 0; i < answers.length; i++) {
    const x = answers[i];
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  let ans = 0;
  for (const [x, count] of cnt.entries()) {
    const groupSize = x + 1;
    const groups = Math.ceil(count / groupSize);
    ans += groups * groupSize;
  }
  return ans;
};

var solve = numRabbits;
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
