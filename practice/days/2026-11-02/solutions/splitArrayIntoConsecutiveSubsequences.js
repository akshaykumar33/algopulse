var isPossible = function(nums) {
    const freq = new Map();
    const need = new Map();
    
    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    
    for (const x of nums) {
        if (freq.get(x) === 0) continue;
        
        if (need.get(x) > 0) {
            need.set(x, need.get(x) - 1);
            need.set(x + 1, (need.get(x + 1) || 0) + 1);
        } else if (freq.get(x + 1) > 0 && freq.get(x + 2) > 0) {
            freq.set(x + 1, freq.get(x + 1) - 1);
            freq.set(x + 2, freq.get(x + 2) - 1);
            need.set(x + 3, (need.get(x + 3) || 0) + 1);
        } else {
            return false;
        }
        
        freq.set(x, freq.get(x) - 1);
    }
    
    return true;
};
var solve = typeof isPossible !== 'undefined' ? isPossible : null;

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
