var kthLargestValue = function(matrix, k) {
  const m = matrix.length;
  const n = matrix[0].length;
  const pref = Array.from({ length: m }, () => new Int32Array(n));
  const vals = new Int32Array(m * n);
  let idx = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let v = matrix[i][j];
      if (i > 0) v ^= pref[i - 1][j];
      if (j > 0) v ^= pref[i][j - 1];
      if (i > 0 && j > 0) v ^= pref[i - 1][j - 1];
      pref[i][j] = v;
      vals[idx++] = v;
    }
  }

  vals.sort();
  return vals[vals.length - k];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(kthLargestValue(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = kthLargestValue;
