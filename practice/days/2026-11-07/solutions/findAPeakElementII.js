var findPeakElement = function(arr) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] < arr[mid + 1]) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
};

var findPeakGrid = function(mat) {
  const m = mat.length;
  const n = mat[0].length;

  let lowRow = 0;
  let highRow = m - 1;

  while (lowRow <= highRow) {
    let midRow = Math.floor((lowRow + highRow) / 2);

    let maxColIdx = 0;
    for (let j = 1; j < n; j++) {
      if (mat[midRow][j] > mat[midRow][maxColIdx]) {
        maxColIdx = j;
      }
    }

    const peakVal = mat[midRow][maxColIdx];

    const isPeakUp = (midRow - 1 >= 0 && mat[midRow - 1][maxColIdx] > peakVal);
    const isPeakDown = (midRow + 1 < m && mat[midRow + 1][maxColIdx] > peakVal);

    if (!isPeakUp && !isPeakDown) {
      return [midRow, maxColIdx];
    } else if (isPeakUp) {
      highRow = midRow - 1;
    } else {
      lowRow = midRow + 1;
    }
  }
  return [-1, -1];
};

var solve = typeof findPeakGrid !== 'undefined' ? findPeakGrid : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = { findPeakGrid, solve };
