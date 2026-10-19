function solve() {
  const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let line = 0;
  const out = [];

  const t = Number(input[line++]);

  for (let i = 0; i < t; i++) {
    const n = Number(input[line++]);
    const a = input[line++].split(' ').map(Number);
    const b = input[line++].split(' ').map(Number);

    a.sort((x, y) => x - y);
    b.sort((x, y) => x - y);

    let possible = true;
    for (let j = 0; j < n; j++) {
      if (a[j] < b[j]) {
        possible = false;
        break;
      }
    }

    if (possible) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
