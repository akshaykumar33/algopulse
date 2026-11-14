const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);
  const s = input[2];

  if (k === 2) {
    let c1 = 0, c2 = 0;
    for (let i = 0; i < n; i++) {
      const exp1 = i % 2 === 0 ? 'A' : 'B';
      const exp2 = i % 2 === 0 ? 'B' : 'A';
      if (s[i] !== exp1) c1++;
      if (s[i] !== exp2) c2++;
    }

    if (c1 <= c2) {
      console.log(c1);
      let res = '';
      for (let i = 0; i < n; i++) res += (i % 2 === 0 ? 'A' : 'B');
      console.log(res);
    } else {
      console.log(c2);
      let res = '';
      for (let i = 0; i < n; i++) res += (i % 2 === 0 ? 'B' : 'A');
      console.log(res);
    }
    return;
  }

  const arr = s.split('');
  let changes = 0;

  for (let i = 1; i < n; i++) {
    if (arr[i] === arr[i - 1]) {
      changes++;
      for (let c = 0; c < k; c++) {
        const char = String.fromCharCode(65 + c);
        if (char !== arr[i - 1] && (i + 1 >= n || char !== arr[i + 1])) {
          arr[i] = char;
          break;
        }
      }
    }
  }

  console.log(changes);
  console.log(arr.join(''));
}

solve();
