/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function(accounts) {
    let max = 0;
    for (let i = 0; i < accounts.length; i++) {
        let current = 0;
        for (let j = 0; j < accounts[i].length; j++) {
            current += accounts[i][j];
        }
        if (current > max) {
            max = current;
        }
    }
    return max;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && maximumWealth.length > 1 ? maximumWealth(...parsed) : maximumWealth(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(maximumWealth(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = maximumWealth;
