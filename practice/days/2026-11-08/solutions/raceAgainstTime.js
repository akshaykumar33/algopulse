const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 5 || tokens[0] === '') return;
  const h = parseInt(tokens[0], 10);
  const m = parseInt(tokens[1], 10);
  const s = parseInt(tokens[2], 10);
  const t1 = parseInt(tokens[3], 10);
  const t2 = parseInt(tokens[4], 10);

  const C = 43200;
  const ps = (s * 720) % C;
  const pm = ((m * 60 + s) * 12) % C;
  const ph = ((h % 12) * 3600 + m * 60 + s) % C;
  const p1 = ((t1 % 12) * 3600) % C;
  const p2 = ((t2 % 12) * 3600) % C;

  function isBetween(a, b, x) {
    if (a < b) {
      return x > a && x < b;
    }
    return x > a || x < b;
  }

  const hands = [ps, pm, ph];

  let cwClear = true;
  for (let i = 0; i < 3; i++) {
    if (isBetween(p1, p2, hands[i])) {
      cwClear = false;
      break;
    }
  }

  let ccwClear = true;
  for (let i = 0; i < 3; i++) {
    if (isBetween(p2, p1, hands[i])) {
      ccwClear = false;
      break;
    }
  }

  if (cwClear || ccwClear) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();
