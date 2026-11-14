var alertNames = function(keyName, keyTime) {
  const map = new Map();
  for (let i = 0; i < keyName.length; i++) {
    const name = keyName[i];
    const [hh, mm] = keyTime[i].split(':').map(Number);
    const mins = hh * 60 + mm;
    if (!map.has(name)) map.set(name, []);
    map.get(name).push(mins);
  }

  const ans = [];
  for (const [name, times] of map.entries()) {
    times.sort((a, b) => a - b);
    for (let i = 0; i + 2 < times.length; i++) {
      if (times[i + 2] - times[i] <= 60) {
        ans.push(name);
        break;
      }
    }
  }
  ans.sort();
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(alertNames(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = alertNames;
