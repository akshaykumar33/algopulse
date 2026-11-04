const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const chars = input[ptr++].split('');
    const n = chars.length;
    let possible = true;

    let left = 0;
    let right = n - 1;
    while (left <= right) {
      if (chars[left] !== '.' && chars[right] !== '.') {
        if (chars[left] !== chars[right]) {
          possible = false;
          break;
        }
      } else if (chars[left] === '.' && chars[right] !== '.') {
        chars[left] = chars[right];
      } else if (chars[left] !== '.' && chars[right] === '.') {
        chars[right] = chars[left];
      } else {
        chars[left] = 'a';
        chars[right] = 'a';
      }
      left++;
      right--;
    }

    if (!possible) {
      out.push(-1);
    } else {
      out.push(chars.join(''));
    }
  }

  console.log(out.join('\n'));
}

solve();

