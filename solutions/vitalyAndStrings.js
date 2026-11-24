const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const s = tokens[0].split('');
  const t = tokens[1];
  const n = s.length;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === 'z') {
      s[i] = 'a';
    } else {
      s[i] = String.fromCharCode(s[i].charCodeAt(0) + 1);
      break;
    }
  }
  const res = s.join('');
  if (res < t) {
    console.log(res);
  } else {
    console.log('No such string');
  }
}

solve();
