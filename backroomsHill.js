const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;

    
    const pos = new Int8Array(n + 1);
    for (let i = 0; i < n; i++) {
      const val = nextInt();
      pos[val] = (i & 1);
    }

    let rem0 = Math.ceil(n / 2);  
    let rem1 = Math.floor(n / 2); 
    let possible = true;

    for (let v = 1; v <= n; v++) {
      const remLen = n - v + 1;
      const p = pos[v];

      if ((remLen & 1) === 1) {
       
        const maj = rem0 > rem1 ? 0 : 1;
        if (p !== maj) {
          possible = false;
          break;
        }
        if (maj === 0) {
          rem0--;
        } else {
          rem1--;
        }
      } else {
        if (p === 0) {
          rem0--;
        } else {
          rem1--;
        }
      }
    }

    out.push(possible ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
