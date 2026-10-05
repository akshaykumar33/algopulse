const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++], 10);
    const arr = lines[lineIdx++].split(' ').map(Number);
    
    let allSameParity = true;
    const firstParity = arr[0] % 2;
    
    for (let j = 1; j < n; j++) {
      if ((arr[j] % 2) !== firstParity) {
        allSameParity = false;
        break;
      }
    }
    
    if (allSameParity) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  
  console.log(out.join('\n'));
}

solve();
