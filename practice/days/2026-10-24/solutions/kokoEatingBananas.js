var minEatingSpeed = function(piles, h) {
    let l = 1;
    let r = Math.max(...piles);
    let ans = r;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        let hours = 0;
        for (let i = 0; i < piles.length; i++) {
            hours += Math.ceil(piles[i] / mid);
        }
        if (hours <= h) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const piles = JSON.parse(lines[i]);
        const h = JSON.parse(lines[i+1]);
        const result = minEatingSpeed(piles, h);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = minEatingSpeed;
