var makeGood = function(s) {
    let stack = [];
    for (let c of s) {
        if (stack.length > 0) {
            let top = stack[stack.length - 1];
            if (top !== c && top.toLowerCase() === c.toLowerCase()) {
                stack.pop();
                continue;
            }
        }
        stack.push(c);
    }
    return stack.join('');
};

var solve = makeGood;

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
