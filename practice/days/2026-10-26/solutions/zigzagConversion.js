var solve = function(s, numRows) {
  if (numRows === 1 || numRows >= s.length) return s;
  const rows = new Array(numRows).fill("");
  let curRow = 0;
  let goingDown = false;
  for (const c of s) {
    rows[curRow] += c;
    if (curRow === 0 || curRow === numRows - 1) {
      goingDown = !goingDown;
    }
    curRow += goingDown ? 1 : -1;
  }
  return rows.join("");
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const numRows = JSON.parse(lines[i+1]);
        const result = solve(s, numRows);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
