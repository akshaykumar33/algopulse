var maximumSum = function(arr) {
  let noDel = arr[0];
  let oneDel = -1e15;
  let ans = arr[0];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const x = arr[i];
    oneDel = Math.max(noDel, oneDel + x);
    noDel = Math.max(x, noDel + x);
    if (noDel > ans) ans = noDel;
    if (oneDel > ans) ans = oneDel;
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(maximumSum(JSON.parse(line))));
    }
  }
}

module.exports = maximumSum;
