var findWinners = function(matches) {
  const losses = new Map();
  for (let i = 0; i < matches.length; i++) {
    const [w, l] = matches[i];
    if (!losses.has(w)) losses.set(w, 0);
    losses.set(l, (losses.get(l) || 0) + 1);
  }
  const zero = [];
  const one = [];
  for (const [p, cnt] of losses.entries()) {
    if (cnt === 0) zero.push(p);
    else if (cnt === 1) one.push(p);
  }
  zero.sort((a, b) => a - b);
  one.sort((a, b) => a - b);
  return [zero, one];
};

var solve = findWinners;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const matches = JSON.parse(lines[i]);
        const result = solve(matches);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = findWinners;

var solve = typeof findPlayersWithZeroOrOneLosses !== 'undefined' ? findPlayersWithZeroOrOneLosses : null;
