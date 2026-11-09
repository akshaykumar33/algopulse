var wordCount = function(startWords, targetWords) {
  const seen = new Set();
  for (let i = 0; i < startWords.length; i++) {
    const s = startWords[i];
    let mask = 0;
    for (let j = 0; j < s.length; j++) {
      mask |= (1 << (s.charCodeAt(j) - 97));
    }
    seen.add(mask);
  }
  let ans = 0;
  for (let i = 0; i < targetWords.length; i++) {
    const s = targetWords[i];
    let mask = 0;
    for (let j = 0; j < s.length; j++) {
      mask |= (1 << (s.charCodeAt(j) - 97));
    }
    for (let j = 0; j < s.length; j++) {
      const sub = mask ^ (1 << (s.charCodeAt(j) - 97));
      if (seen.has(sub)) {
        ans++;
        break;
      }
    }
  }
  return ans;
};

var solve = wordCount;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
