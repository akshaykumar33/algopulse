var longestMountain = function(arr) {
  const n = arr.length;
  let ans = 0, i = 1;
  while (i < n) {
    while (i < n && arr[i] <= arr[i - 1]) i++;
    const st = i - 1;
    let up = 0, down = 0;
    while (i < n && arr[i] > arr[i - 1]) { i++; up++; }
    while (i < n && arr[i] < arr[i - 1]) { i++; down++; }
    if (up > 0 && down > 0) ans = Math.max(ans, i - st);
  }
  return ans;
};
var solve = longestMountain;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = longestMountain;
