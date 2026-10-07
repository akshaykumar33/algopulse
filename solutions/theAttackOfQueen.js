const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  
  const t = parseInt(lines[0], 10);
  const out = [];
  
  for (let i = 1; i <= t; i++) {
    const [nStr, xStr, yStr] = lines[i].split(/\s+/);
    const n = BigInt(nStr);
    const x = BigInt(xStr);
    const y = BigInt(yStr);
    
    const rowCol = (n - 1n) * 2n;
    
    const d1Min = x - 1n < y - 1n ? x - 1n : y - 1n;
    const d1Max = n - x < n - y ? n - x : n - y;
    const diag1 = d1Min + d1Max;
    
    const d2Min = x - 1n < n - y ? x - 1n : n - y;
    const d2Max = n - x < y - 1n ? n - x : y - 1n;
    const diag2 = d2Min + d2Max;
    
    const ans = rowCol + diag1 + diag2;
    out.push(ans.toString());
  }
  
  console.log(out.join('\n'));
}

solve();
