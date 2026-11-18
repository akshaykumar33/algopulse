const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextWord() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('latin1', start, pos);
  }

  const nStr = nextWord();
  if (!nStr) return;
  const n = parseInt(nStr, 10);
  let k = parseInt(nextWord(), 10);
  const s = nextWord();

  const d = s.split('');
  let i = 0;
  while (i < n - 1 && k > 0) {
    if (d[i] === '4' && d[i + 1] === '7') {
      if (i % 2 === 0) {
        if (i + 2 < n && d[i + 2] === '7') {
          k %= 2;
          if (k === 0) break;
          d[i + 1] = '4';
          k = 0;
          break;
        } else {
          d[i + 1] = '4';
          k--;
          i = Math.max(-1, i - 2);
        }
      } else {
        if (i > 0 && d[i - 1] === '4') {
          k %= 2;
          if (k === 0) break;
          d[i] = '7';
          k = 0;
          break;
        } else {
          d[i] = '7';
          k--;
          i = Math.max(-1, i - 2);
        }
      }
    }
    i++;
  }

  console.log(d.join(''));
}

solve();
