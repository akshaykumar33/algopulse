/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function(num) {
    for (let i = num.length - 1; i >= 0; i--) {
        if (parseInt(num[i]) % 2 !== 0) {
            return num.slice(0, i + 1);
        }
    }
    return "";
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
          const result = Array.isArray(parsed) && largestOddNumber.length > 1 ? largestOddNumber(...parsed) : largestOddNumber(parsed);
          console.log(JSON.stringify(result));
        } catch {
          // If line is not valid JSON, treat as raw string input (removing surrounding quotes if present)
          let cleaned = line;
          if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
            cleaned = cleaned.slice(1, -1);
          }
          console.log(JSON.stringify(largestOddNumber(cleaned)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = largestOddNumber;
