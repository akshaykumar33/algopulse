var successfulPairs = function(spells, potions, success) {
    potions.sort((a, b) => a - b);
    const m = potions.length;
    const ans = [];
    for (let i = 0; i < spells.length; i++) {
        const spell = spells[i];
        let l = 0, r = m;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (spell * potions[mid] >= success) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        ans.push(m - l);
    }
    return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        const spells = JSON.parse(lines[i]);
        const potions = JSON.parse(lines[i + 1]);
        const success = JSON.parse(lines[i + 2]);
        const result = successfulPairs(spells, potions, success);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = successfulPairs;
