const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const mat = [];
  for (let i = 0; i < n; i++) {
    const row = new Int32Array(m);
    for (let j = 0; j < m; j++) {
      row[j] = parseInt(input[ptr++], 10);
    }
    mat.push(row);
  }

  let totalScore = 0;
  let totalCost = 0;

  for (let j = 0; j < m; j++) {
    let colOnesBefore = 0;
    let bestScore = 0;
    let bestCost = 0;

    for (let i = 0; i < n; i++) {
      if (mat[i][j] === 1) {
        let curScore = 0;
        const lim = Math.min(n, i + k);
        for (let r = i; r < lim; r++) {
          if (mat[r][j] === 1) curScore++;
        }
        if (curScore > bestScore) {
          bestScore = curScore;
          bestCost = colOnesBefore;
        }
        colOnesBefore++;
      }
    }

    totalScore += bestScore;
    totalCost += bestCost;
  }

  console.log(totalScore + ' ' + totalCost);
}

solve();
