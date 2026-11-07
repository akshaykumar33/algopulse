const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  
  const color = new Int32Array(n + 1);
  
  for (let i = 0; i < m; i++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    
    const dancers = [a, b, c];
    const used = new Uint8Array(4);
    for (const d of dancers) {
      if (color[d] !== 0) used[color[d]] = 1;
    }
    
    let curColor = 1;
    for (const d of dancers) {
      if (color[d] === 0) {
        while (used[curColor]) curColor++;
        color[d] = curColor;
        used[curColor] = 1;
      }
    }
  }
  
  const res = [];
  for (let i = 1; i <= n; i++) res.push(color[i]);
  console.log(res.join(' '));
}

solve();

