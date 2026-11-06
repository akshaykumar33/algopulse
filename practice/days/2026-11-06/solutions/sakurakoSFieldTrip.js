const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }
    
    if (n === 1) {
      out.push(0);
      continue;
    }
    
    const m = Math.floor(n / 2);
    let dp0 = 0;
    let dp1 = 0;
    
    for (let i = 2; i <= m; i++) {
      const u0 = a[i];
      const v0 = a[n - i + 1];
      const u1 = v0;
      const v1 = u0;
      
      const p0 = a[i - 1];
      const q0 = a[n - i + 2];
      const p1 = q0;
      const q1 = p0;
      
      const c00 = (u0 === p0 ? 1 : 0) + (v0 === q0 ? 1 : 0);
      const c10 = (u0 === p1 ? 1 : 0) + (v0 === q1 ? 1 : 0);
      const next0 = Math.min(dp0 + c00, dp1 + c10);
      
      const c01 = (u1 === p0 ? 1 : 0) + (v1 === q0 ? 1 : 0);
      const c11 = (u1 === p1 ? 1 : 0) + (v1 === q1 ? 1 : 0);
      const next1 = Math.min(dp0 + c01, dp1 + c11);
      
      dp0 = next0;
      dp1 = next1;
    }
    
    const u0 = a[m];
    const v0 = a[n - m + 1];
    const u1 = v0;
    const v1 = u0;
    
    let ans0 = dp0;
    let ans1 = dp1;
    
    if (n % 2 === 0) {
      ans0 += (u0 === v0 ? 1 : 0);
      ans1 += (u1 === v1 ? 1 : 0);
    } else {
      const mid = a[m + 1];
      ans0 += (u0 === mid ? 1 : 0) + (v0 === mid ? 1 : 0);
      ans1 += (u1 === mid ? 1 : 0) + (v1 === mid ? 1 : 0);
    }
    
    out.push(Math.min(ans0, ans1));
  }
  
  console.log(out.join('\n'));
}

solve();

