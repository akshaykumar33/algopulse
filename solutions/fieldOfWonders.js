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
  const s = nextWord();
  const m = parseInt(nextWord(), 10);

  const opened = new Uint8Array(26);
  for (let i = 0; i < n; i++) {
    if (s[i] !== '*') {
      opened[s.charCodeAt(i) - 97] = 1;
    }
  }

  const validWords = [];
  for (let i = 0; i < m; i++) {
    const w = nextWord();
    let ok = true;
    for (let j = 0; j < n; j++) {
      if (s[j] !== '*' && s[j] !== w[j]) {
        ok = false;
        break;
      }
      if (s[j] === '*' && opened[w.charCodeAt(j) - 97] === 1) {
        ok = false;
        break;
      }
    }
    if (ok) validWords.push(w);
  }

  if (validWords.length === 0) {
    console.log(0);
    return;
  }

  let candMask = (1 << 26) - 1;
  for (let i = 0; i < validWords.length; i++) {
    const w = validWords[i];
    let wordMask = 0;
    for (let j = 0; j < n; j++) {
      if (s[j] === '*') {
        wordMask |= (1 << (w.charCodeAt(j) - 97));
      }
    }
    candMask &= wordMask;
  }

  let ans = 0;
  for (let i = 0; i < 26; i++) {
    if ((candMask >> i) & 1) ans++;
  }

  console.log(ans);
}

solve();
