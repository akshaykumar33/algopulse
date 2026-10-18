var maxFreqSum = function(s) {
  const freq = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - 97]++;
  }

  const isVowel = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
  let maxV = 0;
  let maxC = 0;

  for (let i = 0; i < 26; i++) {
    if (isVowel[i]) {
      if (freq[i] > maxV) maxV = freq[i];
    } else {
      if (freq[i] > maxC) maxC = freq[i];
    }
  }

  return maxV + maxC;
};

var findMostFrequentVowelAndConsonant = maxFreqSum;
var solve = maxFreqSum;

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
