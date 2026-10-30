var transposeFile = function(content) {
  if (!content) return "";
  const lines = content.trim().split(/\r?\n/).filter(Boolean);
  const rows = lines.map(line => line.trim().split(/\s+/));
  const numCols = rows[0].length;
  const res = [];
  for (let c = 0; c < numCols; c++) {
    const colWords = [];
    for (let r = 0; r < rows.length; r++) {
      if (rows[r][c] !== undefined) colWords.push(rows[r][c]);
    }
    res.push(colWords.join(' '));
  }
  return res.join('\n');
};

var solve = function(content) {
  return transposeFile(content);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      let parsed = raw;
      try { parsed = JSON.parse(raw); } catch (_) {}
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
