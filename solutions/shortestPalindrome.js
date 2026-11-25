const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').split(/\r?\n/);
let idx = 0;

function shortestPalindrome(s) {
  const n = s.length;
  if (n <= 1) return s;
  let rev = '';
  for (let i = n - 1; i >= 0; i--) rev += s[i];
  const comb = s + '#' + rev;
  const m = comb.length;
  const pi = new Int32Array(m);
  for (let i = 1; i < m; i++) {
    let j = pi[i - 1];
    while (j > 0 && comb.charCodeAt(i) !== comb.charCodeAt(j)) {
      j = pi[j - 1];
    }
    if (comb.charCodeAt(i) === comb.charCodeAt(j)) j++;
    pi[i] = j;
  }
  const l = pi[m - 1];
  return rev.slice(0, n - l) + s;
}

const out = [];

function solve() {
  while (idx < lines.length && lines[idx].trim() === '') idx++;
  if (idx >= lines.length) return;
  const t = parseInt(lines[idx++].trim(), 10);
  for (let tc = 0; tc < t; tc++) {
    const s = (lines[idx++] ?? '').trim();
    out.push(shortestPalindrome(s));
  }
}

solve();
console.log(out.join('\n'));
