var diagonalSum = function(mat) {
    let n = mat.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += mat[i][i];
        if (i !== n - 1 - i) {
            sum += mat[i][n - 1 - i];
        }
    }
    return sum;
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
          const result = Array.isArray(parsed) && diagonalSum.length > 1 ? diagonalSum(...parsed) : diagonalSum(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(diagonalSum(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = diagonalSum;
