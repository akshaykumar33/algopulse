const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const s = input[1];

  const map = {
    '2': ['2'],
    '3': ['3'],
    '4': ['3', '2', '2'],
    '5': ['5'],
    '6': ['5', '3'],
    '7': ['7'],
    '8': ['7', '2', '2', '2'],
    '9': ['7', '3', '3', '2'],
  };

  const digits = [];
  for (let i = 0; i < n; i++) {
    const ch = s[i];
    if (map[ch]) {
      digits.push(...map[ch]);
    }
  }

  digits.sort((a, b) => b.localeCompare(a));
  console.log(digits.join(''));
}

solve();
