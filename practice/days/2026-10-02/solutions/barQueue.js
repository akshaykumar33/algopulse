const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0] === '') return;
  
  let t = parseInt(lines[0], 10);
  let idx = 1;
  let out = [];
  
  while (t--) {
    if (idx >= lines.length) break;
    let n = parseInt(lines[idx++], 10);
    let arr = lines[idx++].split(' ').map(Number);
    
    let ans = 0;
    let cur = 0;
    for (let i = 0; i < n; i++) {
      if (arr[i] === 1) {
        cur++;
      } else {
        if (cur > 0) {
          ans += Math.floor(cur / 2);
          cur = 0;
        }
      }
    }
    if (cur > 0) {
      ans += Math.floor(cur / 2);
    }
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();
