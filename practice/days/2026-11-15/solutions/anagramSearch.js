const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const s = input[0];
  const p = input[1];
  const n = s.length;
  const m = p.length;

  if (m > n) {
    console.log(0);
    return;
  }

  const pCnt = new Int32Array(26);
  for (let i = 0; i < m; i++) pCnt[p.charCodeAt(i) - 97]++;

  const sCnt = new Int32Array(26);
  for (let i = 0; i < m; i++) {
    if (s[i] !== '?') sCnt[s.charCodeAt(i) - 97]++;
  }

  function check() {
    for (let c = 0; c < 26; c++) {
      if (sCnt[c] > pCnt[c]) return false;
    }
    return true;
  }

  let ans = check() ? 1 : 0;
  for (let i = m; i < n; i++) {
    const outChar = s[i - m];
    if (outChar !== '?') sCnt[outChar.charCodeAt(0) - 97]--;
    const inChar = s[i];
    if (inChar !== '?') sCnt[inChar.charCodeAt(0) - 97]++;
    if (check()) ans++;
  }

  console.log(ans);
}

solve();
