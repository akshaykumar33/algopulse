const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const n = parseInt(lines[0], 10);
  let minArea = Infinity;
  let maxArea = -Infinity;
  let minIdx = 0;
  let maxIdx = 0;
  
  for (let i = 1; i <= n; i++) {
    const parts = lines[i].trim().split(/\s+/).map(Number);
    const x1 = parts[0], y1 = parts[1];
    const x2 = parts[2], y2 = parts[3];
    const x3 = parts[4], y3 = parts[5];
    
    const area = 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
    
    if (area <= minArea) {
      minArea = area;
      minIdx = i;
    }
    if (area >= maxArea) {
      maxArea = area;
      maxIdx = i;
    }
  }
  
  console.log(minIdx + ' ' + maxIdx);
}

solve();
