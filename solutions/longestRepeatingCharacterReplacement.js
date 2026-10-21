var characterReplacement = function(s, k) {
    let counts = new Array(26).fill(0);
    let left = 0;
    let maxFreq = 0;
    let ans = 0;
    for (let right = 0; right < s.length; right++) {
        let idx = s.charCodeAt(right) - 65;
        counts[idx]++;
        maxFreq = Math.max(maxFreq, counts[idx]);
        while ((right - left + 1) - maxFreq > k) {
            counts[s.charCodeAt(left) - 65]--;
            left++;
        }
        ans = Math.max(ans, right - left + 1);
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
        const k = JSON.parse(lines[i + 1]);
        const result = characterReplacement(s, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = characterReplacement;
