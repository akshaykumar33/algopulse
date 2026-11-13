var maxVowels = function(s, k) {
  const isVowel = (ch) => ch === 97 || ch === 101 || ch === 105 || ch === 111 || ch === 117;
  let cur = 0;
  for (let i = 0; i < k; i++) {
    if (isVowel(s.charCodeAt(i))) cur++;
  }
  let ans = cur;
  for (let i = k; i < s.length; i++) {
    if (isVowel(s.charCodeAt(i))) cur++;
    if (isVowel(s.charCodeAt(i - k))) cur--;
    if (cur > ans) {
      ans = cur;
      if (ans === k) return k;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    if (lines.length === 1) {
      const parsed = JSON.parse(lines[0]);
      console.log(JSON.stringify(maxVowels(...parsed)));
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(maxVowels(s, k)));
      }
    }
  }
}

module.exports = maxVowels;
