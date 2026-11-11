var latestTimeCatchTheBus = function(buses, passengers, capacity) {
  const b = buses.slice().sort((x, y) => x - y);
  const p = passengers.slice().sort((x, y) => x - y);
  const n = b.length;
  const m = p.length;
  let pi = 0;
  let cnt = 0;

  for (let bi = 0; bi < n; bi++) {
    const dep = b[bi];
    cnt = 0;
    while (pi < m && p[pi] <= dep && cnt < capacity) {
      pi++;
      cnt++;
    }
  }

  let ans = cnt < capacity ? b[n - 1] : p[pi - 1] - 1;
  let k = cnt < capacity ? pi - 1 : pi - 2;
  while (k >= 0 && p[k] === ans) {
    ans--;
    k--;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 3 && Array.isArray(p[0]) && Array.isArray(p[1]) && typeof p[2] === 'number';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(latestTimeCatchTheBus(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 2 < lines.length; i += 3) {
        const args = lines.slice(i, i + 3).map((l) => JSON.parse(l));
        console.log(JSON.stringify(latestTimeCatchTheBus(...args)));
      }
    }
  }
}

module.exports = latestTimeCatchTheBus;
