const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let data = '';
process.stdin.on('data', (chunk) => {
  data += chunk;
});

process.stdin.on('end', () => {
  const lines = data.trim().split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) process.exit(0);

  const t = parseInt(lines[0], 10);
  const out = [];

  for (let i = 1; i <= t && i < lines.length; i++) {
    const s = lines[i];
    const stack = [];
    let res = '';
    for (let j = 0; j < s.length; j++) {
      const ch = s[j];
      if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
        res += ch;
      } else if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '^') {
        stack.push(ch);
      } else if (ch === ')') {
        if (stack.length > 0) res += stack.pop();
      }
    }
    while (stack.length > 0) res += stack.pop();
    out.push(res);
  }

  process.stdout.write(out.join('\n') + '\n');
  process.exit(0);
});
