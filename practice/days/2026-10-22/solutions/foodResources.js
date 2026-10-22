const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const [n, m] = input[lineIdx++].split(' ').map(Number);
    const a = input[lineIdx++].split(' ').map(Number);
    const b = input[lineIdx++].split(' ').map(Number);
    
    let sumA = 0;
    for (let j = 0; j < n; j++) sumA += a[j];
    
    let sumB = 0;
    for (let j = 0; j < m; j++) sumB += b[j];
    
    if (sumA <= sumB) {
      out.push("Yes");
    } else {
      out.push("No");
    }
  }
  
  console.log(out.join('\n'));
}

solve();
