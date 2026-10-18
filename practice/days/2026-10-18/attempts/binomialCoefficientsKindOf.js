const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (lines.length === 0 || lines[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  
  const nArr = new Array(t);
  for (let i = 0; i < t; i++) {
    nArr[i] = parseInt(lines[ptr++], 10);
  }
  
  const kArr = new Array(t);
  for (let i = 0; i < t; i++) {
    kArr[i] = parseInt(lines[ptr++], 10);
  }
  
  const mod = 1000000007;
  const maxK = 200005;
  const p2 = new Array(maxK);
  p2[0] = 1;
  for (let i = 1; i < maxK; i++) {
    p2[i] = (p2[i - 1] * 2) % mod;
  }
  
  const out = [];
  for (let i = 0; i < t; i++) {
    const k = kArr[i];
    out.push(p2[k]);
  }
  
  console.log(out.join('\n'));
}

solve();
