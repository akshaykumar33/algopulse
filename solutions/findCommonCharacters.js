var commonChars = function(words) {
  let minFreq = new Array(26).fill(0);
  for (let i = 0; i < words[0].length; i++) {
    minFreq[words[0].charCodeAt(i) - 97]++;
  }
  for (let i = 1; i < words.length; i++) {
    let curFreq = new Array(26).fill(0);
    for (let j = 0; j < words[i].length; j++) {
      curFreq[words[i].charCodeAt(j) - 97]++;
    }
    for (let k = 0; k < 26; k++) {
      minFreq[k] = Math.min(minFreq[k], curFreq[k]);
    }
  }
  let ans = [];
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < minFreq[i]; j++) {
      ans.push(String.fromCharCode(i + 97));
    }
  }
  return ans;
};

var solve = commonChars;

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
