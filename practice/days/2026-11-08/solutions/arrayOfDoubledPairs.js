var canReorderDoubled = function(arr) {
  const cnt = new Map();
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  if ((cnt.get(0) || 0) % 2 !== 0) return false;
  const keys = Array.from(cnt.keys()).sort((a, b) => Math.abs(a) - Math.abs(b));
  for (let i = 0; i < keys.length; i++) {
    const x = keys[i];
    const c = cnt.get(x) || 0;
    if (c === 0 || x === 0) continue;
    const target = 2 * x;
    const targetCount = cnt.get(target) || 0;
    if (targetCount < c) return false;
    cnt.set(target, targetCount - c);
    cnt.set(x, 0);
  }
  return true;
};

var solve = canReorderDoubled;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
