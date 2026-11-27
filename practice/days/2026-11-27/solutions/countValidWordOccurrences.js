var countValidWordOccurrences = function(words, pattern) { 
  let ans = 0; 
  if (!words || !Array.isArray(words) || !pattern || typeof pattern !== 'string') { 
    return 0; 
  } 
  for (const w of words) { 
    if (typeof w !== 'string') continue; 
    if (w.length === pattern.length) { 
      let ok = true; 
      for (let i = 0; i < w.length; i++) { 
        if (pattern[i] !== '?' && pattern[i] !== w[i]) { 
          ok = false; 
          break; 
        } 
      } 
      if (ok) ans++; 
    } 
  } 
  return ans; 
}; 
var solve = countValidWordOccurrences; 
if (require.main === module) { 
  const fs = require('fs'); 
  const raw = fs.readFileSync(0, 'utf-8').trim(); 
  if (raw) { 
    const lines = raw.split(/\r?\n/).filter(Boolean); 
    const parsed = lines.map(l => JSON.parse(l)); 
    const res = solve(...parsed); 
    console.log(JSON.stringify(res)); 
  } 
} 
module.exports = countValidWordOccurrences;
