var maximumBags = function(capacity, rocks, additionalRocks) {
  const n = capacity.length;
  const needed = new Int32Array(n);
  for (let i = 0; i < n; i++) needed[i] = capacity[i] - rocks[i];
  needed.sort();

  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (additionalRocks >= needed[i]) {
      additionalRocks -= needed[i];
      ans++;
    } else {
      break;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 3) {
      console.log(JSON.stringify(maximumBags(JSON.parse(lines[i]), JSON.parse(lines[i + 1]), JSON.parse(lines[i + 2]))));
    }
  }
}

module.exports = maximumBags;
