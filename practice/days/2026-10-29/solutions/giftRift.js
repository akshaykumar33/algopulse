const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  let ptr = 0;
  const R = parseInt(input[ptr++], 10);
  const C = parseInt(input[ptr++], 10);

  const mat = [];
  const rowMin = new Int32Array(R).fill(Infinity);
  const colMax = new Int32Array(C).fill(-Infinity);

  for (let r = 0; r < R; r++) {
    const row = new Int32Array(C);
    for (let c = 0; c < C; c++) {
      const val = parseInt(input[ptr++], 10);
      row[c] = val;
      if (val < rowMin[r]) rowMin[r] = val;
      if (val > colMax[c]) colMax[c] = val;
    }
    mat.push(row);
  }

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const val = mat[r][c];
      if (val === rowMin[r] && val === colMax[c]) {
        console.log(val);
        return;
      }
    }
  }

  console.log('GUESS');
}

solve();
