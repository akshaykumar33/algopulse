var findHighAccessEmployees = function(access_times) {
  const map = new Map();
  for (let i = 0; i < access_times.length; i++) {
    const name = access_times[i][0];
    const time = access_times[i][1];
    const mins = parseInt(time.slice(0, 2), 10) * 60 + parseInt(time.slice(2), 10);
    if (!map.has(name)) map.set(name, []);
    map.get(name).push(mins);
  }

  const ans = [];
  for (const [name, times] of map.entries()) {
    times.sort((a, b) => a - b);
    let high = false;
    for (let i = 0; i + 2 < times.length; i++) {
      if (times[i + 2] - times[i] < 60) {
        high = true;
        break;
      }
    }
    if (high) ans.push(name);
  }

  ans.sort();
  return ans;
};

var solve = findHighAccessEmployees;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = findHighAccessEmployees;
