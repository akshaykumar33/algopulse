const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const p = parseInt(input[1], 10);
  const s = input[2].split('');

  let diff = false;
  for (let i = 0; i + p < n; i++) {
    if (s[i] !== '.' && s[i + p] !== '.') {
      if (s[i] !== s[i + p]) {
        diff = true;
        break;
      }
    } else if (s[i] === '.' && s[i + p] === '.') {
      s[i] = '0';
      s[i + p] = '1';
      diff = true;
      break;
    } else if (s[i] === '.') {
      s[i] = s[i + p] === '0' ? '1' : '0';
      diff = true;
      break;
    } else {
      s[i + p] = s[i] === '0' ? '1' : '0';
      diff = true;
      break;
    }
  }

  if (!diff) {
    console.log('No');
    return;
  }

  for (let i = 0; i < n; i++) {
    if (s[i] === '.') s[i] = '0';
  }
  console.log(s.join(''));
}

solve();
