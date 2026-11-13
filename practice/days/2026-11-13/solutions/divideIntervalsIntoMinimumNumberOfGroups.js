var minGroups = function(intervals) {
  let maxR = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][1] > maxR) maxR = intervals[i][1];
  }
  const diff = new Int32Array(maxR + 2);
  for (let i = 0; i < intervals.length; i++) {
    diff[intervals[i][0]]++;
    diff[intervals[i][1] + 1]--;
  }
  let ans = 0;
  let cur = 0;
  for (let i = 0; i <= maxR; i++) {
    cur += diff[i];
    if (cur > ans) ans = cur;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(minGroups(JSON.parse(line))));
    }
  }
}

module.exports = minGroups;
