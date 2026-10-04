const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let ptr = 1;
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    
    const pts = [];
    for (let j = 1; j <= 12; j++) {
      if (j === a || j === b) pts.push(1);
      if (j === c || j === d) pts.push(2);
    }
    
    if (pts[0] !== pts[1]) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  
  console.log(out.join('\n'));
}

solve();
