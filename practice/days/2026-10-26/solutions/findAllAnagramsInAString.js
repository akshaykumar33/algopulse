var solve = function(s, p) {
  let ans = [];
  let n = s.length;
  let m = p.length;
  if (n < m) return ans;
  
  let pFreq = new Int32Array(26);
  let sFreq = new Int32Array(26);
  
  for (let i = 0; i < m; i++) {
    pFreq[p.charCodeAt(i) - 97]++;
    sFreq[s.charCodeAt(i) - 97]++;
  }
  
  let match = true;
  for (let i = 0; i < 26; i++) {
    if (pFreq[i] !== sFreq[i]) {
      match = false;
      break;
    }
  }
  
  if (match) ans.push(0);
  
  for (let i = m; i < n; i++) {
    sFreq[s.charCodeAt(i) - 97]++;
    sFreq[s.charCodeAt(i - m) - 97]--;
    
    match = true;
    for (let j = 0; j < 26; j++) {
      if (pFreq[j] !== sFreq[j]) {
        match = false;
        break;
      }
    }
    if (match) ans.push(i - m + 1);
  }
  
  return ans;
};

var findAnagrams = solve;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
          const s = JSON.parse(lines[i]);
          const p = JSON.parse(lines[i + 1]);
          const result = solve(s, p);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
