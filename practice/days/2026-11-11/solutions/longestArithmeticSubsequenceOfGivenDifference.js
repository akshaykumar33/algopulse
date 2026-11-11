var longestSubsequence = function(arr, difference) {
  const dp = new Map();
  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    const len = (dp.get(x - difference) || 0) + 1;
    const prev = dp.get(x) || 0;
    if (len > prev) {
      dp.set(x, len);
      if (len > ans) ans = len;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const arity = longestSubsequence.length;
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === arity;
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(longestSubsequence(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + arity - 1 < lines.length; i += arity) {
        const args = lines.slice(i, i + arity).map((l) => JSON.parse(l));
        console.log(JSON.stringify(longestSubsequence(...args)));
      }
    }
  }
}
