const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const s = tokens[0];
  const target = "CODEFORCES";
  const n = s.length;
  const m = target.length;
  
  let ans = false;
  for (let i = 0; i <= m; i++) {
    let left = target.substring(0, i);
    let right = target.substring(i);
    if (s.startsWith(left) && s.endsWith(right)) {
      if (left.length + right.length <= n) {
        ans = true;
        break;
      }
    }
  }
  
  const out = [ans ? "YES" : "NO"];
  console.log(out.join('\n'));
}

solve();
