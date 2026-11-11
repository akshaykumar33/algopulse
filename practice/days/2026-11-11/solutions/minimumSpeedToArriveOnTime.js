var minSpeedOnTime = function(dist, hour) {
  const n = dist.length;
  const hour100 = Math.round(hour * 100);
  if (hour100 <= (n - 1) * 100) return -1;

  const can = (speed) => {
    let time = 0;
    for (let i = 0; i < n - 1; i++) {
      time += ((dist[i] + speed - 1) / speed) | 0;
    }
    const time100 = time * 100;
    if (time100 >= hour100) return false;
    const rem100 = hour100 - time100;
    const last100 = 100 * dist[n - 1];
    if (rem100 >= last100) return true;
    return last100 <= rem100 * speed;
  };

  let lo = 1;
  let hi = 10000000;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (can(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const arity = minSpeedOnTime.length;
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === arity;
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(minSpeedOnTime(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + arity - 1 < lines.length; i += arity) {
        const args = lines.slice(i, i + arity).map((l) => JSON.parse(l));
        console.log(JSON.stringify(minSpeedOnTime(...args)));
      }
    }
  }
}
