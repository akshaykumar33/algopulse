const fs = require('fs');

function solve() {
  const content = fs.readFileSync(0, 'utf-8').trim();
  if (!content) return;

  const tokens = content.split(/\s+/);
  let idx = 0;
  const output = [];

  while (idx < tokens.length) {
    const nStr = tokens[idx++];
    if (!nStr) break;
    const N = parseInt(nStr, 10);
    if (isNaN(N) || N <= 0) break;

    const M = parseInt(tokens[idx++], 10);
    const totalA = N * N;
    const totalB = M * M;

    const arrA = new Int32Array(totalA);
    for (let i = 0; i < totalA; i++) {
      arrA[i] = parseInt(tokens[idx++], 10);
    }

    const arrB = new Int32Array(totalB);
    for (let i = 0; i < totalB; i++) {
      arrB[i] = parseInt(tokens[idx++], 10);
    }

    arrA.sort();
    arrB.sort();

    let ptrA = 0;
    let ptrB = 0;
    let possible = true;

    while (ptrB < totalB && ptrA < totalA) {
      if (arrA[ptrA] === arrB[ptrB]) {
        ptrA++;
        ptrB++;
      } else if (arrA[ptrA] < arrB[ptrB]) {
        ptrA++;
      } else {
        possible = false;
        break;
      }
    }

    if (ptrB < totalB) {
      possible = false;
    }

    output.push(possible ? 'TRUE' : 'FALSE');
  }

  if (output.length > 0) {
    console.log(output.join('\n'));
  }
}

solve();
