var solve = function(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        while (l < r && !isAlphaNumeric(s[l])) {
            l++;
        }
        while (l < r && !isAlphaNumeric(s[r])) {
            r--;
        }
        if (s[l].toLowerCase() !== s[r].toLowerCase()) {
            return false;
        }
        l++;
        r--;
    }
    return true;
};

function isAlphaNumeric(c) {
    const code = c.charCodeAt(0);
    return (code >= 48 && code <= 57) || 
           (code >= 65 && code <= 90) || 
           (code >= 97 && code <= 122);
}

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
