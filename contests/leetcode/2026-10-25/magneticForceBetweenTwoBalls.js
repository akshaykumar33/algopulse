var maxDistance = function(position, m) {
  position.sort((a, b) => a - b);
  let lo = 1;
  let hi = position[position.length - 1] - position[0];
  let ans = 1;

  function canPlace(d) {
    let count = 1;
    let last = position[0];
    for (let i = 1; i < position.length; i++) {
      if (position[i] - last >= d) {
        count++;
        last = position[i];
        if (count >= m) return true;
      }
    }
    return false;
  }

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (canPlace(mid)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
};

var solve = maxDistance;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed[0], parsed[1])));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = maxDistance;
