const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let a = parseInt(tokens[0], 10);
  let b = parseInt(tokens[1], 10);
  let c = parseInt(tokens[2], 10);

  const week = [0, 1, 2, 0, 2, 1, 0];
  const full = Math.min(Math.floor(a / 3), Math.floor(b / 2), Math.floor(c / 2));

  a -= full * 3;
  b -= full * 2;
  c -= full * 2;

  let maxExtra = 0;
  for (let s = 0; s < 7; s++) {
    let cur = s;
    let ca = a;
    let cb = b;
    let cc = c;
    let days = 0;

    while (true) {
      const type = week[cur];
      if (type === 0) {
        if (ca > 0) ca--;
        else break;
      } else if (type === 1) {
        if (cb > 0) cb--;
        else break;
      } else {
        if (cc > 0) cc--;
        else break;
      }
      days++;
      cur = (cur + 1) % 7;
    }

    if (days > maxExtra) {
      maxExtra = days;
    }
  }

  console.log(full * 7 + maxExtra);
}

solve();
