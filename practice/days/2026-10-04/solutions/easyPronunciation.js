const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const t = parseInt(lines[0], 10);
  let lineIdx = 1;
  const out = [];
  
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++], 10);
    const s = lines[lineIdx++];
    
    let cnt = 0;
    let hard = false;
    for (let j = 0; j < n; j++) {
      if (vowels.has(s[j])) {
        cnt = 0;
      } else {
        cnt++;
        if (cnt >= 4) {
          hard = true;
          break;
        }
      }
    }
    
    if (hard) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }
  
  console.log(out.join('\n'));
}

solve();
