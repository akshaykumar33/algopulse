var countSeniors = function(details) {
  let cnt = 0;
  for (let i = 0; i < details.length; i++) {
    let age = parseInt(details[i].slice(11, 13), 10);
    if (age > 60) {
      cnt++;
    }
  }
  return cnt;
};

var solve = countSeniors;

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
