const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const n = s.length;
    let all9 = true;
    for (let i = 0; i < n; i++) if (s[i] !== '9') { all9 = false; break; }
    if (all9) {
      out.push('1' + '0'.repeat(n - 1) + '1');
      continue;
    }
    const a = s.split('').map(Number);
    const mid = Math.floor(n / 2);
    let i = mid - 1;
    let j = (n % 2 === 0) ? mid : mid + 1;
    let leftSmaller = false;
    while (i >= 0 && a[i] === a[j]) { i--; j++; }
    if (i < 0 || a[i] < a[j]) leftSmaller = true;
    while (i >= 0) { a[j] = a[i]; i--; j++; }
    if (leftSmaller) {
      let carry = 1;
      i = mid - 1;
      if (n % 2 === 1) {
        a[mid] += carry;
        carry = Math.floor(a[mid] / 10);
        a[mid] %= 10;
        j = mid + 1;
      } else {
        j = mid;
      }
      while (i >= 0) {
        a[i] += carry;
        carry = Math.floor(a[i] / 10);
        a[i] %= 10;
        a[j] = a[i];
        i--; j++;
      }
    }
    out.push(a.join(''));
  }
  console.log(out.join('\n'));
}
