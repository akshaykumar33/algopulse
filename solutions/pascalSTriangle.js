var generate = function(numRows) {
  let res = [];
  for (let i = 0; i < numRows; i++) {
    let row = new Array(i + 1);
    row[0] = 1;
    row[i] = 1;
    for (let j = 1; j < i; j++) {
      row[j] = res[i - 1][j - 1] + res[i - 1][j];
    }
    res.push(row);
  }
  return res;
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
          const result = Array.isArray(parsed) && generate.length > 1 ? generate(...parsed) : generate(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(generate(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = generate;
