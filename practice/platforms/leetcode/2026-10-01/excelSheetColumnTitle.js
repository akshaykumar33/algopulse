/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
    let res = [];
    while (columnNumber > 0) {
        columnNumber--;
        let remainder = columnNumber % 26;
        res.push(String.fromCharCode(65 + remainder));
        columnNumber = Math.floor(columnNumber / 26);
    }
    return res.reverse().join('');
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
          const result = Array.isArray(parsed) && convertToTitle.length > 1 ? convertToTitle(...parsed) : convertToTitle(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(convertToTitle(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = convertToTitle;
