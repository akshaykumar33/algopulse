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
    if (first[c] !== -1 && last[c] - first[c] >= 2) {
      const midMask = new Uint8Array(26);
      let count = 0;
      for (let i = first[c] + 1; i < last[c]; i++) {
        const midC = s.charCodeAt(i) - 97;
        if (!midMask[midC]) {
          midMask[midC] = 1;
          count++;
          if (count === 26) break;
        }
      }
      ans += count;
    }
  }
  return ans;
};

var solve = countPalindromicSubsequence;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = countPalindromicSubsequence;