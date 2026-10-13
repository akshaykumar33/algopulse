const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let ptr = 0;
  if (ptr >= input.length || input[ptr] === '') return;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    
    let isIndian = false;
    let isForeign = false;
    
    for (let j = 0; j < n; j++) {
      if (s[j] === 'I') {
        isIndian = true;
      } else if (s[j] === 'Y') {
        isForeign = true;
      }
    }
    
    if (isIndian) {
      out.push('INDIAN');
    } else if (isForeign) {
      out.push('NOT INDIAN');
    } else {
      out.push('NOT SURE');
    }
  }
  
  console.log(out.join('\n'));
}

solve();
