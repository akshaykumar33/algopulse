var carPooling = function(trips, capacity) {
  let maxTo = 0;
  const n = trips.length;
  for (let i = 0; i < n; i++) {
    if (trips[i][2] > maxTo) maxTo = trips[i][2];
  }

  const diff = new Int32Array(maxTo + 1);
  for (let i = 0; i < n; i++) {
    const t = trips[i];
    diff[t[1]] += t[0];
    diff[t[2]] -= t[0];
  }

  let cur = 0;
  for (let i = 0; i <= maxTo; i++) {
    cur += diff[i];
    if (cur > capacity) return false;
  }

  return true;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && Array.isArray(p[0]) && typeof p[1] === 'number';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(carPooling(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(carPooling(...args)));
      }
    }
  }
}

module.exports = carPooling;
