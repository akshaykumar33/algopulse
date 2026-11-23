const fs = require('fs');

function solve() {
  function query(s) {
    fs.writeSync(1, s + '\n');
    let line = '';
    const b = Buffer.alloc(1);
    while (true) {
      let read;
      try {
        read = fs.readSync(0, b, 0, 1, null);
      } catch (e) {
        break;
      }
      if (read === 0) break;
      const char = b.toString('utf-8');
      if (char === '\n') break;
      line += char;
    }
    const parts = line.trim().split(/\s+/).map(Number);
    return { bulls: parts[0] || 0, cows: parts[1] || 0 };
  }
  const digits = [];
  for (let d = 0; d < 10; d++) {
    const s = String(d).repeat(4);
    const res = query(s);
    if (res.bulls === 4) return;
    if (res.bulls > 0) digits.push(d);
  }
  const p = [0, 1, 2, 3];
  function permute(l) {
    if (l === 4) {
      const s = '' + digits[p[0]] + digits[p[1]] + digits[p[2]] + digits[p[3]];
      const res = query(s);
      if (res.bulls === 4) process.exit(0);
      return;
    }
    for (let i = l; i < 4; i++) {
      let tmp = p[l]; p[l] = p[i]; p[i] = tmp;
      permute(l + 1);
      tmp = p[l]; p[l] = p[i]; p[i] = tmp;
    }
  }
  permute(0);
}

solve();
