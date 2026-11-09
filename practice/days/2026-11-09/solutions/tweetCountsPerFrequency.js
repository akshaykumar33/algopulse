var TweetCounts = function() {
  this.map = new Map();
};

TweetCounts.prototype.recordTweet = function(tweetName, time) {
  if (!this.map.has(tweetName)) {
    this.map.set(tweetName, []);
  }
  this.map.get(tweetName).push(time);
};

TweetCounts.prototype.getTweetCountsPerFrequency = function(freq, tweetName, startTime, endTime) {
  let delta = 60;
  if (freq === 'hour') delta = 3600;
  else if (freq === 'day') delta = 86400;
  const chunks = Math.floor((endTime - startTime) / delta) + 1;
  const ans = new Array(chunks).fill(0);
  const times = this.map.get(tweetName);
  if (times) {
    for (let i = 0; i < times.length; i++) {
      const t = times[i];
      if (t >= startTime && t <= endTime) {
        const idx = Math.floor((t - startTime) / delta);
        ans[idx]++;
      }
    }
  }
  return ans;
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'TweetCounts') {
      obj = new TweetCounts();
      res.push(null);
    } else {
      const r = obj[cmd](...arg);
      res.push(r === undefined ? null : r);
    }
  }
  return res;
};

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
