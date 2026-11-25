var maxChunksToSorted = function(arr) {
  let mx = 0;
  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > mx) mx = arr[i];
    if (mx === i) ans++;
  }
  return ans;
};

var solve = maxChunksToSorted;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const arr = JSON.parse(lines[i]);
      out.push(JSON.stringify(maxChunksToSorted(arr)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = maxChunksToSorted;
