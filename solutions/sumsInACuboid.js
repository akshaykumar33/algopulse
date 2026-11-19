const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const X = parseInt(input[ptr++], 10);
    const Y = parseInt(input[ptr++], 10);
    const Z = parseInt(input[ptr++], 10);

    const B = new Array(X);
    for (let i = 0; i < X; i++) {
      B[i] = new Array(Y);
      for (let j = 0; j < Y; j++) {
        B[i][j] = new Int32Array(Z);
        for (let k = 0; k < Z; k++) {
          B[i][j][k] = parseInt(input[ptr++], 10);
        }
      }
    }

    for (let i = X - 1; i >= 1; i--) {
      for (let j = 0; j < Y; j++) {
        for (let k = 0; k < Z; k++) {
          B[i][j][k] -= B[i - 1][j][k];
        }
      }
    }

    for (let i = 0; i < X; i++) {
      for (let j = Y - 1; j >= 1; j--) {
        for (let k = 0; k < Z; k++) {
          B[i][j][k] -= B[i][j - 1][k];
        }
      }
    }

    for (let i = 0; i < X; i++) {
      for (let j = 0; j < Y; j++) {
        for (let k = Z - 1; k >= 1; k--) {
          B[i][j][k] -= B[i][j][k - 1];
        }
      }
    }

    for (let i = 0; i < X; i++) {
      for (let j = 0; j < Y; j++) {
        out.push(B[i][j].join(' '));
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
