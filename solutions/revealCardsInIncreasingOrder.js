var revealCardsInIncreasingOrder = function(deck) {
  deck.sort((a, b) => a - b);
  const n = deck.length;
  const q = [];
  for (let i = 0; i < n; i++) q.push(i);
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[q.shift()] = deck[i];
    if (q.length > 0) {
      q.push(q.shift());
    }
  }
  return res;
};

var solve = typeof revealCardsInIncreasingOrder !== 'undefined' ? revealCardsInIncreasingOrder : null;

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

