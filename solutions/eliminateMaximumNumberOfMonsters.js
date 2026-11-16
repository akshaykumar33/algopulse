var eliminateMaximum = function(dist, speed) {
  const n = dist.length;
  const t = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    t[i] = Math.ceil(dist[i] / speed[i]);
  }
  t.sort();

  for (let i = 0; i < n; i++) {
    if (t[i] <= i) return i;
  }
  return n;
};

var solve = eliminateMaximum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
