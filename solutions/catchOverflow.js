const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const l = parseInt(tokens[ptr++], 10);
  const LIMIT = 4294967295n;
  const st = [1n];
  let x = 0n;
  let overflow = false;
  for (let i = 0; i < l; i++) {
    const cmd = tokens[ptr++];
    if (cmd === 'for') {
      const n = BigInt(tokens[ptr++]);
      const top = st[st.length - 1];
      let nextVal = top * n;
      if (nextVal > LIMIT) nextVal = LIMIT + 1n;
      st.push(nextVal);
    } else if (cmd === 'end') {
      st.pop();
    } else if (cmd === 'add') {
      const addVal = st[st.length - 1];
      if (addVal > LIMIT || x > LIMIT - addVal) {
        overflow = true;
      } else {
        x += addVal;
      }
    }
  }
  if (overflow || x > LIMIT) {
    console.log('OVERFLOW!!!');
  } else {
    console.log(x.toString());
  }
}

solve();
