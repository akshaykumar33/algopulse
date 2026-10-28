const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let h1 = parseInt(tokens[0], 10);
  const a1 = parseInt(tokens[1], 10);
  const c = parseInt(tokens[2], 10);
  let h2 = parseInt(tokens[3], 10);
  const a2 = parseInt(tokens[4], 10);

  const actions = [];
  while (h2 > 0) {
    if (h2 <= a1) {
      actions.push('STRIKE');
      h2 -= a1;
    } else if (h1 <= a2) {
      actions.push('HEAL');
      h1 += c;
    } else {
      actions.push('STRIKE');
      h2 -= a1;
    }

    if (h2 > 0) {
      h1 -= a2;
    }
  }

  console.log(actions.length);
  console.log(actions.join('\n'));
}

solve();

