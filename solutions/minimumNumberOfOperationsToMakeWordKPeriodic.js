var minimumOperationsToMakeKPeriodic = function(word, k) {
  const cnt = new Map();
  let maxFreq = 0;
  const total = word.length / k;

  for (let i = 0; i < word.length; i += k) {
    const sub = word.slice(i, i + k);
    const c = (cnt.get(sub) || 0) + 1;
    cnt.set(sub, c);
    if (c > maxFreq) {
      maxFreq = c;
    }
  }

  return total - maxFreq;
};

var solve = minimumOperationsToMakeKPeriodic;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
