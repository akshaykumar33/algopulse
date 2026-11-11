const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;

  const n = s.length;
  const dots = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === '.') {
      dots.push(i);
    }
  }

  const d = dots.length;
  if (d === 0) {
    console.log('NO');
    return;
  }

  if (dots[0] < 1 || dots[0] > 8) {
    console.log('NO');
    return;
  }

  const tail = n - 1 - dots[d - 1];
  if (tail < 1 || tail > 3) {
    console.log('NO');
    return;
  }

  for (let i = 0; i + 1 < d; i++) {
    const gap = dots[i + 1] - dots[i] - 1;
    if (gap < 2 || gap > 11) {
      console.log('NO');
      return;
    }
  }

  const out = ['YES'];
  let start = 0;
  for (let i = 0; i + 1 < d; i++) {
    const gap = dots[i + 1] - dots[i] - 1;
    const ext = gap > 9 ? gap - 8 : 1;
    const end = dots[i] + ext + 1;
    out.push(s.slice(start, end));
    start = end;
  }
  out.push(s.slice(start));

  console.log(out.join('\n'));
}

solve();
