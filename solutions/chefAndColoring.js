const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let t = parseInt(lines[0], 10);
  let idx = 1;
  let out = [];
  
  while (t--) {
    let n = parseInt(lines[idx++], 10);
    let s = lines[idx++];
    
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === 'R') r++;
      else if (s[i] === 'G') g++;
      else if (s[i] === 'B') b++;
    }
    
    let maxFreq = Math.max(r, g, b);
    out.push(n - maxFreq);
  }
  
  console.log(out.join('\n'));
}

solve();
