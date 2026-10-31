const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const s = tokens[0];
  const stack = [];
  const match = { '}': '{', ']': '[', ')': '(', '>': '<' };
  const open = { '{': true, '[': true, '(': true, '<': true };
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (open[c]) {
      stack.push(c);
    } else {
      if (stack.length === 0) {
        console.log('Impossible');
        return;
      }
      const top = stack.pop();
      if (top !== match[c]) {
        ans++;
      }
    }
  }
  if (stack.length > 0) {
    console.log('Impossible');
  } else {
    console.log(ans);
  }
}
solve();
