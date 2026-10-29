const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const t = parseInt(input[0], 10);
  const out = [];

  for (let tc = 1; tc <= t; tc++) {
    const s = input[tc];
    const stack = [];
    let res = '';

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch >= 'a' && ch <= 'z') {
        res += ch;
      } else if (ch === '(') {
        stack.push(ch);
      } else if (ch === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          res += stack.pop();
        }
        stack.pop();
      } else {
        stack.push(ch);
      }
    }

    while (stack.length > 0) {
      const op = stack.pop();
      if (op !== '(') res += op;
    }

    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();
