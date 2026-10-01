/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function(s) {
    let result = '';
    let depth = 0;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(') {
            if (depth > 0) {
                result += char;
            }
            depth++;
        } else {
            depth--;
            if (depth > 0) {
                result += char;
            }
        }
    }
    
    return result;
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
          const result = Array.isArray(parsed) && removeOuterParentheses.length > 1 ? removeOuterParentheses(...parsed) : removeOuterParentheses(parsed);
          console.log(JSON.stringify(result));
        } catch {
          // If parsing as JSON fails, try passing the string directly (unquoted strings)
          let cleanLine = line;
          if (cleanLine.startsWith('"') && cleanLine.endsWith('"')) {
            try { cleanLine = JSON.parse(cleanLine); } catch {}
          }
          console.log(JSON.stringify(removeOuterParentheses(cleanLine)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = removeOuterParentheses;
