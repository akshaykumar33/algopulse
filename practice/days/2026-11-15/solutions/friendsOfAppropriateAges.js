var numFriendRequests = function(ages) {
  const count = new Int32Array(121);
  for (let i = 0; i < ages.length; i++) {
    count[ages[i]]++;
  }

  let ans = 0;
  for (let x = 15; x <= 120; x++) {
    if (count[x] === 0) continue;
    for (let y = Math.floor(0.5 * x) + 8; y <= x; y++) {
      if (count[y] === 0) continue;
      if (x === y) ans += count[x] * (count[x] - 1);
      else ans += count[x] * count[y];
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(numFriendRequests(JSON.parse(lines[i]))));
    }
  }
}

module.exports = numFriendRequests;
