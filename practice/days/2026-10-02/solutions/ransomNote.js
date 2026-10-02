var solve = function(ransomNote, magazine) {
  const cnt = new Array(26).fill(0);
  for (let i = 0; i < magazine.length; i++) {
    cnt[magazine.charCodeAt(i) - 97]++;
  }
  for (let i = 0; i < ransomNote.length; i++) {
    const idx = ransomNote.charCodeAt(i) - 97;
    cnt[idx]--;
    if (cnt[idx] < 0) return false;
  }
  return true;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const a = JSON.parse(lines[i]);
        const b = JSON.parse(lines[i + 1]);
        const res = solve(a, b);
        console.log(JSON.stringify(res));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
