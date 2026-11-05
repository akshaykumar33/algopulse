var getWatchedVideosByYourFriends = function(watchedVideos, friends, id, level) {
  let q = [id];
  let vis = new Set([id]);
  let curLevel = 0;
  while (q.length > 0 && curLevel < level) {
    let nextQ = [];
    for (let u of q) {
      for (let v of friends[u]) {
        if (!vis.has(v)) {
          vis.add(v);
          nextQ.push(v);
        }
      }
    }
    q = nextQ;
    curLevel++;
  }
  let freq = new Map();
  for (let u of q) {
    for (let vid of watchedVideos[u]) {
      freq.set(vid, (freq.get(vid) || 0) + 1);
    }
  }
  let arr = [];
  for (let [vid, count] of freq.entries()) {
    arr.push({vid, count});
  }
  arr.sort((a, b) => {
    if (a.count !== b.count) return a.count - b.count;
    return a.vid < b.vid ? -1 : a.vid > b.vid ? 1 : 0;
  });
  return arr.map(x => x.vid);
};
var solve = getWatchedVideosByYourFriends;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 4) {
        const watchedVideos = JSON.parse(lines[i]);
        const friends = JSON.parse(lines[i+1]);
        const id = JSON.parse(lines[i+2]);
        const level = JSON.parse(lines[i+3]);
        const result = solve(watchedVideos, friends, id, level);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
