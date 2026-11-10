var winnerOfGame = function(colors) {
  let a = 0;
  let b = 0;
  const n = colors.length;
  for (let i = 1; i < n - 1; i++) {
    if (colors[i] === 'A' && colors[i - 1] === 'A' && colors[i + 1] === 'A') {
      a++;
    } else if (colors[i] === 'B' && colors[i - 1] === 'B' && colors[i + 1] === 'B') {
      b++;
    }
  }
  return a > b;
};

var solve = winnerOfGame;

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
