var maxDepth = function(s) {
    let ans = 0;
    let cur = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            cur++;
            if (cur > ans) ans = cur;
        } else if (s[i] === ')') {
            cur--;
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
          const result = Array.isArray(parsed) && maxDepth.length > 1 ? maxDepth(...parsed) : maxDepth(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(maxDepth(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = maxDepth;
