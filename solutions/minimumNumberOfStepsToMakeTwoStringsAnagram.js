var minSteps = function(s, t) {
    const cnt = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);
    for (let i = 0; i < s.length; i++) {
        cnt[s.charCodeAt(i) - base]++;
        cnt[t.charCodeAt(i) - base]--;
    }
    let ans = 0;
    for (let i = 0; i < 26; i++) {
        if (cnt[i] > 0) {
            ans += cnt[i];
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
        const s = JSON.parse(lines[i]);
        const t = JSON.parse(lines[i + 1]);
        const result = minSteps(s, t);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = minSteps;
