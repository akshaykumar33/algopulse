const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const words = [];
  for (let i = 1; i <= n; i++) {
    words.push(tokens[i]);
  }

  const alpha = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 26; i++) {
    const ch = alpha[i];
    let found = false;
    for (let j = 0; j < n; j++) {
      if (words[j].includes(ch)) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(ch);
      return;
    }
  }

  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 26; j++) {
      const s = alpha[i] + alpha[j];
      let found = false;
      for (let k = 0; k < n; k++) {
        if (words[k].includes(s)) {
          found = true;
          break;
        }
      }
      if (!found) {
        console.log(s);
        return;
      }
    }
  }
}

solve();
