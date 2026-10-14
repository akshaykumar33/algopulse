const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length < 2) return;
  
  const [h1, m1] = lines[0].split(':').map(Number);
  const [h2, m2] = lines[1].split(':').map(Number);
  
  const t1 = h1 * 60 + m1;
  const t2 = h2 * 60 + m2;
  const mid = Math.floor((t1 + t2) / 2);
  
  const h3 = Math.floor(mid / 60);
  const m3 = mid % 60;
  
  const outH = String(h3).padStart(2, '0');
  const outM = String(m3).padStart(2, '0');
  
  console.log(`${outH}:${outM}`);
}

solve();
