const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;
  const n = s.length;
  if (n < 26) {
    console.log(-1);
    return;
  }

  const arr = s.split('');
  let found = -1;

  for (let i = 0; i <= n - 26; i++) {
    const seen = new Uint8Array(26);
    let valid = true;
    for (let j = 0; j < 26; j++) {
      const ch = arr[i + j];
      if (ch !== '?') {
        const idx = ch.charCodeAt(0) - 65;
        if (seen[idx]) {
          valid = false;
          break;
        }
        seen[idx] = 1;
      }
    }
    if (valid) {
      found = i;
      break;
    }
  }

  if (found === -1) {
    console.log(-1);
    return;
  }

  const seen = new Uint8Array(26);
  for (let j = 0; j < 26; j++) {
    const ch = arr[found + j];
    if (ch !== '?') {
      seen[ch.charCodeAt(0) - 65] = 1;
    }
  }

  const missing = [];
  for (let i = 0; i < 26; i++) {
    if (!seen[i]) missing.push(String.fromCharCode(65 + i));
  }

  let mIdx = 0;
  for (let j = 0; j < 26; j++) {
    if (arr[found + j] === '?') {
      arr[found + j] = missing[mIdx++];
    }
  }

  for (let i = 0; i < n; i++) {
    if (arr[i] === '?') arr[i] = 'A';
  }

  console.log(arr.join(''));
}

solve();

