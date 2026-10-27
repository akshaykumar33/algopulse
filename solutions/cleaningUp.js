const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const completed = new Uint8Array(n + 1);
    for (let i = 0; i < m; i++) {
      completed[parseInt(tokens[ptr++], 10)] = 1;
    }

    const chef = [];
    const assistant = [];
    let chefTurn = true;

    for (let i = 1; i <= n; i++) {
      if (!completed[i]) {
        if (chefTurn) {
          chef.push(i);
        } else {
          assistant.push(i);
        }
        chefTurn = !chefTurn;
      }
    }

    out.push(chef.length ? chef.join(' ') : '-1');
    out.push(assistant.length ? assistant.join(' ') : '-1');
  }
  console.log(out.join('\n'));
}

solve();
