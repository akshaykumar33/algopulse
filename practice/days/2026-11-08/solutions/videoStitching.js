var videoStitching = function(clips, time) {
  const maxReach = new Int32Array(time + 1);
  for (let i = 0; i < clips.length; i++) {
    const s = clips[i][0];
    const e = clips[i][1];
    if (s <= time && e > maxReach[s]) {
      maxReach[s] = e;
    }
  }
  let ans = 0;
  let curEnd = 0;
  let nextEnd = 0;
  for (let i = 0; i < time; i++) {
    if (maxReach[i] > nextEnd) {
      nextEnd = maxReach[i];
    }
    if (i === curEnd) {
      if (nextEnd <= i) return -1;
      ans++;
      curEnd = nextEnd;
      if (curEnd >= time) return ans;
    }
  }
  return curEnd >= time ? ans : -1;
};

var solve = videoStitching;
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
