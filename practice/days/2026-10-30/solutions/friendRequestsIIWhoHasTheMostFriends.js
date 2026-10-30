var mostFriends = function(requests) {
  const count = new Map();
  for (const [u, v] of requests) {
    count.set(u, (count.get(u) || 0) + 1);
    count.set(v, (count.get(v) || 0) + 1);
  }
  let bestId = -1;
  let maxNum = -1;
  for (const [id, num] of count.entries()) {
    if (num > maxNum) {
      maxNum = num;
      bestId = id;
    }
  }
  return [{ id: bestId, num: maxNum }];
};

var solve = function(requests) {
  return mostFriends(requests);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
