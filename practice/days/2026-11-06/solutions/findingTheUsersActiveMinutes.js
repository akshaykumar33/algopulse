var findingUsersActiveMinutes = function(logs, k) {
  const map = new Map();
  for (let i = 0; i < logs.length; i++) {
    const id = logs[i][0];
    const time = logs[i][1];
    let set = map.get(id);
    if (!set) {
      set = new Set();
      map.set(id, set);
    }
    set.add(time);
  }

  const ans = new Array(k).fill(0);
  for (const set of map.values()) {
    const uam = set.size;
    if (uam >= 1 && uam <= k) {
      ans[uam - 1]++;
    }
  }

  return ans;
};

var solve = typeof findingUsersActiveMinutes !== 'undefined' ? findingUsersActiveMinutes : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const logs = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(logs, k)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

