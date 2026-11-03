var dota2Senate = function(senate) {
    let rQ = [];
    let dQ = [];
    let n = senate.length;
    for (let i = 0; i < n; i++) {
        if (senate[i] === 'R') {
            rQ.push(i);
        } else {
            dQ.push(i);
        }
    }
    while (rQ.length > 0 && dQ.length > 0) {
        let rIdx = rQ.shift();
        let dIdx = dQ.shift();
        if (rIdx < dIdx) {
            rQ.push(rIdx + n);
        } else {
            dQ.push(dIdx + n);
        }
    }
    return rQ.length > 0 ? "Radiant" : "Dire";
};
var solve = typeof dota2Senate !== 'undefined' ? dota2Senate : null;

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
