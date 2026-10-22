const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = input[idx++];
    const y = input[idx++];
    const arr1 = x.split('');
    const arr2 = y.split('');
    let diff = false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) continue;
      if (!diff) {
        if (arr1[i] < arr2[i]) {
          const tmp = arr1[i];
          arr1[i] = arr2[i];
          arr2[i] = tmp;
        }
        diff = true;
      } else {
        if (arr1[i] > arr2[i]) {
          const tmp = arr1[i];
          arr1[i] = arr2[i];
          arr2[i] = tmp;
        }
      }
    }

    out.push(arr1.join(''));
    out.push(arr2.join(''));
  }

  console.log(out.join('\n'));
}

solve();
