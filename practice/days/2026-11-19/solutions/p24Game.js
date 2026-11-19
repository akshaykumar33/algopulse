const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;

  const n = Number(input);
  if (n < 4) {
    console.log('NO');
    return;
  }

  const out = ['YES'];
  if (n % 2 === 0) {
    out.push('1 * 2 = 2');
    out.push('2 * 3 = 6');
    out.push('6 * 4 = 24');
    for (let i = 5; i <= n; i += 2) {
      out.push((i + 1) + ' - ' + i + ' = 1');
      out.push('24 * 1 = 24');
    }
  } else {
    out.push('5 * 4 = 20');
    out.push('20 + 3 = 23');
    out.push('23 + 2 = 25');
    out.push('25 - 1 = 24');
    for (let i = 6; i <= n; i += 2) {
      out.push((i + 1) + ' - ' + i + ' = 1');
      out.push('24 * 1 = 24');
    }
  }

  console.log(out.join('\n'));
}

solve();
