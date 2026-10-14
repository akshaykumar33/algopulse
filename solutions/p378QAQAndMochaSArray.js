const solve = () => {
  const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let line = 0;
  const readInt = () => parseInt(input[line++], 10);
  const readIntArr = () => input[line++].split(' ').map(Number);

  const t = readInt();
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = readInt();
    const a = readIntArr();
    a.sort((x, y) => x - y);
    const minVal = a[0];
    let possible = true;
    for (let j = 1; j < n; j++) {
      if (a[j] % minVal !== 0) {
        possible = false;
        break;
      }
    }
    out.push(possible ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
};

solve();
