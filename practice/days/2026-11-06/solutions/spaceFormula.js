const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const d = parseInt(input[ptr++], 10);
  
  const s = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    s[i] = parseInt(input[ptr++], 10);
  }
  
  const pts = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    pts[i] = parseInt(input[ptr++], 10);
  }
  
  const myTotal = s[d - 1] + pts[0];
  
  function canBeat(k) {
    if (k === 0) return true;
    for (let j = 0; j < k; j++) {
      if (s[d - 1 - k + j] + pts[n - 1 - j] > myTotal) {
        return false;
      }
    }
    return true;
  }
  
  let low = 0;
  let high = d - 1;
  let bestK = 0;
  
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (canBeat(mid)) {
      bestK = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  console.log(d - bestK);
}

solve();
