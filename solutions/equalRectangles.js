const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const T = parseInt(input[lineIdx++], 10);
  const output = [];

  for (let t = 0; t < T; t++) {
    const N = parseInt(input[lineIdx++], 10);
    const A = input[lineIdx++].split(' ').map(Number);
    A.sort((a, b) => a - b);

    let possible = true;
    const area = A[0] * A[4 * N - 1];

    for (let i = 0; i < N; i++) {
      const l1 = A[2 * i];
      const l2 = A[2 * i + 1];
      const r1 = A[4 * N - 1 - (2 * i + 1)];
      const r2 = A[4 * N - 1 - (2 * i)];

      if (l1 !== l2 || r1 !== r2 || l1 * r1 !== area) {
        possible = false;
        break;
      }
    }
    output.push(possible ? 'YES' : 'NO');
  }
  console.log(output.join('\n'));
}

solve();
