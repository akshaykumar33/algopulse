const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  const lines = input.split(/\r?\n/);
  let lineIdx = 0;
  while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
  if (lineIdx >= lines.length) return;
  const T = parseInt(lines[lineIdx++].trim(), 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    while (lineIdx < lines.length && lines[lineIdx].trim() === '') lineIdx++;
    if (lineIdx >= lines.length) break;
    const freqSeq = lines[lineIdx++];
    const text = lines[lineIdx++];
    const cnt = new Int32Array(26);
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        cnt[code - 65]++;
      } else if (code >= 97 && code <= 122) {
        cnt[code - 97]++;
      }
    }
    const order = [];
    for (let i = 0; i < 26; i++) order.push(i);
    order.sort((a, b) => {
      if (cnt[a] !== cnt[b]) return cnt[a] - cnt[b];
      return a - b;
    });
    const map = new Int32Array(26);
    for (let i = 0; i < 26; i++) {
      const cipherCharIdx = order[i];
      const plainCharCode = freqSeq.charCodeAt(i);
      map[cipherCharIdx] = plainCharCode;
    }
    const res = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        res.push(String.fromCharCode(map[code - 65] - 32));
      } else if (code >= 97 && code <= 122) {
        res.push(String.fromCharCode(map[code - 97]));
      } else {
        res.push(text[i]);
      }
    }
    out.push(res.join(''));
  }
  console.log(out.join('\n'));
}

solve();
