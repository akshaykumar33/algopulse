const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const a = [];
  for (let i = 0; i < n; i++) {
    const row = new Int32Array(m);
    for (let j = 0; j < m; j++) {
      row[j] = parseInt(input[ptr++], 10);
    }
    a.push(row);
  }

  const dp1 = Array.from({ length: n + 2 }, () => new Float64Array(m + 2));
  const dp2 = Array.from({ length: n + 2 }, () => new Float64Array(m + 2));
  const dp3 = Array.from({ length: n + 2 }, () => new Float64Array(m + 2));
  const dp4 = Array.from({ length: n + 2 }, () => new Float64Array(m + 2));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp1[i][j] = a[i - 1][j - 1] + Math.max(dp1[i - 1][j], dp1[i][j - 1]);
    }
  }

  for (let i = n; i >= 1; i--) {
    for (let j = m; j >= 1; j--) {
      dp2[i][j] = a[i - 1][j - 1] + Math.max(dp2[i + 1][j], dp2[i][j + 1]);
    }
  }

  for (let i = n; i >= 1; i--) {
    for (let j = 1; j <= m; j++) {
      dp3[i][j] = a[i - 1][j - 1] + Math.max(dp3[i + 1][j], dp3[i][j - 1]);
    }
  }

  for (let i = 1; i <= n; i++) {
    for (let j = m; j >= 1; j--) {
      dp4[i][j] = a[i - 1][j - 1] + Math.max(dp4[i - 1][j], dp4[i][j + 1]);
    }
  }

  let ans = 0;
  for (let i = 2; i < n; i++) {
    for (let j = 2; j < m; j++) {
      const opt1 = dp1[i - 1][j] + dp2[i + 1][j] + dp3[i][j - 1] + dp4[i][j + 1];
      const opt2 = dp1[i][j - 1] + dp2[i][j + 1] + dp3[i + 1][j] + dp4[i - 1][j];
      if (opt1 > ans) ans = opt1;
      if (opt2 > ans) ans = opt2;
    }
  }

  console.log(ans);
}

solve();
