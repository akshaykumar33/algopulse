var maxFreq = function(s, maxLetters, minSize, maxSize) {
  const n = s.length;
  if (n < minSize) return 0;
  const counts = new Map();
  const freq = new Int32Array(26);
  let distinct = 0;

  for (let i = 0; i < minSize; i++) {
    const c = s.charCodeAt(i) - 97;
    if (freq[c] === 0) distinct++;
    freq[c]++;
  }

  if (distinct <= maxLetters) {
    const sub = s.slice(0, minSize);
    counts.set(sub, 1);
  }

  for (let i = minSize; i < n; i++) {
    const outChar = s.charCodeAt(i - minSize) - 97;
    freq[outChar]--;
    if (freq[outChar] === 0) distinct--;

    const inChar = s.charCodeAt(i) - 97;
    if (freq[inChar] === 0) distinct++;
    freq[inChar]++;

    if (distinct <= maxLetters) {
      const sub = s.slice(i - minSize + 1, i + 1);
      counts.set(sub, (counts.get(sub) || 0) + 1);
    }
  }

  let maxOccur = 0;
  for (const c of counts.values()) {
    if (c > maxOccur) maxOccur = c;
  }
  return maxOccur;
};

var solve = maxFreq;
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
