const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const s = tokens[0];

  for (let i = 0; i < s.length; i++) {
    const v = s.charCodeAt(i) - 48;
    if (v % 8 === 0) {
      console.log('YES\n' + v);
      return;
    }
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const v = (s.charCodeAt(i) - 48) * 10 + (s.charCodeAt(j) - 48);
      if (v % 8 === 0) {
        console.log('YES\n' + v);
        return;
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      for (let k = j + 1; k < s.length; k++) {
        const v = (s.charCodeAt(i) - 48) * 100 + (s.charCodeAt(j) - 48) * 10 + (s.charCodeAt(k) - 48);
        if (v % 8 === 0) {
          console.log('YES\n' + v);
          return;
        }
      }
    }
  }

  console.log('NO');
}

solve();
