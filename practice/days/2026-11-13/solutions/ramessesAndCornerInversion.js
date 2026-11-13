const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();

  const A = [];
  for (let i = 0; i < n; i++) {
    const row = new Uint8Array(m);
    for (let j = 0; j < m; j++) {
      row[j] = nextInt();
    }
    A.push(row);
  }

  const rowParity = new Uint8Array(n);
  const colParity = new Uint8Array(m);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const b = nextInt();
      const diff = A[i][j] ^ b;
      rowParity[i] ^= diff;
      colParity[j] ^= diff;
    }
  }

  let ok = true;
  for (let i = 0; i < n; i++) {
    if (rowParity[i] !== 0) {
      ok = false;
      break;
    }
  }
  if (ok) {
    for (let j = 0; j < m; j++) {
      if (colParity[j] !== 0) {
        ok = false;
        break;
      }
    }
  }

  console.log(ok ? 'Yes' : 'No');
}

solve();
