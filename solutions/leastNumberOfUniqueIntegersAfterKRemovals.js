var findLeastNumOfUniqueInts = function(arr, k) {
  const cnt = new Map();
  for (const x of arr) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  const freq = Array.from(cnt.values());
  freq.sort((a, b) => a - b);
  let ans = freq.length;
  let rem = k;
  for (const f of freq) {
    if (rem >= f) {
      rem -= f;
      ans--;
    } else {
      break;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const arr = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = findLeastNumOfUniqueInts(arr, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = findLeastNumOfUniqueInts;
