/**
 * @param {string} s
 * @return {number}
 */
var scoreOfString = function(s) {
    let score = 0;
    for (let i = 0; i < s.length - 1; i++) {
        score += Math.abs(s.charCodeAt(i) - s.charCodeAt(i + 1));
    }
    return score;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && scoreOfString.length > 1 ? scoreOfString(...parsed) : scoreOfString(parsed);
          console.log(JSON.stringify(result));
        } catch {
          // If not valid JSON, treat line as string (or unquoted string)
          let val = line;
          if (val.startsWith('"') && val.endsWith('"')) {
              try { val = JSON.parse(val); } catch {}
          }
          const result = scoreOfString(val);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = scoreOfString;
