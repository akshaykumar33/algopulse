var countPalindromicSubsequence = function(s) {
  const first = new Int32Array(26).fill(-1);
  const last = new Int32Array(26).fill(-1);

  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i) - 97;
    if (first[c] === -1) first[c] = i;
    last[c] = i;
  }

  let ans = 0;
  for (let c = 0; c < 26; c++) {
    const l = first[c];
    const r = last[c];
    if (r - l >= 2) {
      const seen = new Uint8Array(26);
      let count = 0;
      for (let i = l + 1; i < r; i++) {
        const mid = s.charCodeAt(i) - 97;
        if (!seen[mid]) {
          seen[mid] = 1;
          count++;
        }
      }
      ans += count;
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(countPalindromicSubsequence(JSON.parse(lines[i]))));
    }
  }
}

module.exports = countPalindromicSubsequence;
