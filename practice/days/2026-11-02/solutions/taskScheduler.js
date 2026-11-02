var leastInterval = function(tasks, n) {
  const cnt = new Array(26).fill(0);
  for (const t of tasks) {
    cnt[t.charCodeAt(0) - 65]++;
  }
  cnt.sort((a, b) => a - b);
  const maxVal = cnt[25] - 1;
  let idle = maxVal * n;
  for (let i = 24; i >= 0 && cnt[i] > 0; i--) {
    idle -= Math.min(maxVal, cnt[i]);
  }
  return Math.max(tasks.length, tasks.length + Math.max(0, idle));
};
var solve = typeof leastInterval !== 'undefined' ? leastInterval : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const tasks = JSON.parse(lines[i]);
        const n = JSON.parse(lines[i+1]);
        const result = solve(tasks, n);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
