const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const w = parseInt(input[ptr++], 10);
  
  let cur = 0;
  let minPref = 0;
  let maxPref = 0;
  
  for (let i = 0; i < n; i++) {
    cur += parseInt(input[ptr++], 10);
    if (cur < minPref) minPref = cur;
    if (cur > maxPref) maxPref = cur;
  }
  
  const minX = Math.max(0, -minPref);
  const maxX = Math.min(w, w - maxPref);
  
  const ans = Math.max(0, maxX - minX + 1);
  console.log(ans);
}

solve();

