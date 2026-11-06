const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const d = parseInt(input[ptr++], 10) - 1;
  
  const s = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    s[i] = parseInt(input[ptr++], 10);
  }
  
  const pts = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    pts[i] = parseInt(input[ptr++], 10);
  }
  
  const myTotal = s[d] + pts[0];
  let ptIdx = 1;
  let rank = 1;
  
  for (let i = 0; i < d; i++) {
    if (s[i] + pts[ptIdx] >= myTotal) {
      ptIdx++;
      rank++;
    }
  }
  
  console.log(rank);
}

solve();

