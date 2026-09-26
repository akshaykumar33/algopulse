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

  function nextString(len) {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    const start = offset;
    offset += len;
    return buffer.subarray(start, offset);
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const q = nextInt();
    if (n === null || q === null) break;

    const sBuf = nextString(n);
    const a = new Uint8Array(n);
    let c0 = 0;
    let c1 = 0;

    for (let i = 0; i < n; i++) {
      const bit = sBuf[i] - 48;
      a[i] = bit;
      if (bit === 0) c0++;
      else c1++;
    }

    let sumTransitions = 0;
    for (let j = 0; j < n - 1; j++) {
      if (a[j] !== a[j + 1]) {
        sumTransitions += (j + 1) * (n - 1 - j);
      }
    }

    const res = [];
    res.push((sumTransitions + c0 * c1) / 2);

    for (let qi = 0; qi < q; qi++) {
      const pos = nextInt() - 1; 

    
      if (a[pos] === 0) {
        c0--;
        c1++;
      } else {
        c1--;
        c0++;
      }

      
      if (pos > 0) {
        const j = pos - 1;
        const weight = (j + 1) * (n - 1 - j);
        if (a[j] !== a[pos]) {
          sumTransitions -= weight;
        } else {
          sumTransitions += weight;
        }
      }

     
      if (pos < n - 1) {
        const j = pos;
        const weight = (j + 1) * (n - 1 - j);
        if (a[pos] !== a[pos + 1]) {
          sumTransitions -= weight;
        } else {
          sumTransitions += weight;
        }
      }

    
      a[pos] = 1 - a[pos];

      res.push((sumTransitions + c0 * c1) / 2);
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
