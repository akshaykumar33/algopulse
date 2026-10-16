const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[lineIdx++], 10);
    const arr = input[lineIdx++].split(' ').map(Number);
    
    let ok = true;
    for (let i = 0; i < n - 1; i++) {
      let m = Math.min(arr[i], arr[i + 1]);
      arr[i] -= m;
      arr[i + 1] -= m;
      if (arr[i] > arr[i + 1]) {
        ok = false;
      }
    }
    
    if (ok) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }
  
  console.log(out.join('\n'));
}

solve();
