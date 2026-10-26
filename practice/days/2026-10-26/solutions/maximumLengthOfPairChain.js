var findLongestChain = function(pairs) {
    pairs.sort((a, b) => a[1] - b[1]);
    let ans = 0;
    let cur = -Infinity;
    for (const p of pairs) {
        if (p[0] > cur) {
            ans++;
            cur = p[1];
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
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && findLongestChain.length > 1 ? findLongestChain(...parsed) : findLongestChain(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(findLongestChain(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = findLongestChain;
