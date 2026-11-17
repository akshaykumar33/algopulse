var firstCompleteIndex = function(arr, mat) {
  const m = mat.length;
  const n = mat[0].length;
  const total = m * n;

  const rPos = new Int32Array(total + 1);
  const cPos = new Int32Array(total + 1);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const v = mat[r][c];
      rPos[v] = r;
      cPos[v] = c;
    }
  }

  const rowCount = new Int32Array(m);
  const colCount = new Int32Array(n);

  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    const r = rPos[v];
    const c = cPos[v];
    rowCount[r]++;
    colCount[c]++;
    if (rowCount[r] === n || colCount[c] === m) {
      return i;
    }
  }

  return 0;
};

var solve = firstCompleteIndex;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
