const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  
  let t = parseInt(input[0]);
  let lineIdx = 1;
  let out = [];
  
  while (t--) {
    if (lineIdx >= input.length) break;
    let n = parseInt(input[lineIdx++]);
    let x = input[lineIdx++].split(' ').map(Number);
    let y = input[lineIdx++].split(' ').map(Number);
    
    let points = [];
    for (let i = 0; i < n; i++) {
      points.push({ x: x[i], y: y[i], id: i + 1 });
    }
    
    points.sort((a, b) => {
      let distA = a.x * a.x + a.y * a.y;
      let distB = b.x * b.x + b.y * b.y;
      if (distA !== distB) {
        return distA - distB;
      }
      if (a.x !== b.x) {
        return a.x - b.x;
      }
      return a.id - b.id;
    });
    
    let res = points.map(p => p.id).join(' ');
    out.push(res);
  }
  
  console.log(out.join('\n'));
}

solve();
