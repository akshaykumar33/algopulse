var minimumRounds = function(tasks) {
  const map = new Map();
  for (let i = 0; i < tasks.length; i++) {
    map.set(tasks[i], (map.get(tasks[i]) || 0) + 1);
  }

  let ans = 0;
  for (const count of map.values()) {
    if (count === 1) return -1;
    ans += Math.ceil(count / 3);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(minimumRounds(JSON.parse(line))));
    }
  }
}

module.exports = minimumRounds;
