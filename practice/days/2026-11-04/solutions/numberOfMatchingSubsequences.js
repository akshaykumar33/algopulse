var numMatchingSubseq = function(s, words) {
  const buckets = Array.from({ length: 26 }, () => []);
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    buckets[w.charCodeAt(0) - 97].push({ word: w, idx: 0 });
  }

  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i) - 97;
    const cur = buckets[c];
    buckets[c] = [];
    for (let j = 0; j < cur.length; j++) {
      const item = cur[j];
      item.idx++;
      if (item.idx === item.word.length) {
        ans++;
      } else {
        const nextChar = item.word.charCodeAt(item.idx) - 97;
        buckets[nextChar].push(item);
      }
    }
  }

  return ans;
};

var numberOfMatchingSubsequences = numMatchingSubseq;
var solve = typeof numberOfMatchingSubsequences !== 'undefined' ? numberOfMatchingSubsequences : null;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

