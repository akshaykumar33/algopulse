var decodeCiphertext = function(encodedText, rows) {
  const cols = encodedText.length / rows;
  const res = [];

  for (let c = 0; c < cols; c++) {
    let r = 0, curC = c;
    while (r < rows && curC < cols) {
      res.push(encodedText[r * cols + curC]);
      r++;
      curC++;
    }
  }

  return res.join('').replace(/\s+$/, '');
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(decodeCiphertext(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = decodeCiphertext;
