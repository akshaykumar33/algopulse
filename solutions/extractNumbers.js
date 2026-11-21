const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) {
    console.log('-');
    console.log('-');
    return;
  }
  const tokens = input.split(/[,;]/);
  const a = [];
  const b = [];
  function isValid(tok) {
    if (!tok || tok.length === 0) return false;
    if (tok.length > 1 && tok[0] === '0') return false;
    for (let i = 0; i < tok.length; i++) {
      const code = tok.charCodeAt(i);
      if (code < 48 || code > 57) return false;
    }
    return true;
  }
  for (const tok of tokens) {
    if (isValid(tok)) a.push(tok);
    else b.push(tok);
  }
  if (a.length > 0) console.log('"' + a.join(',') + '"');
  else console.log('-');
  if (b.length > 0) console.log('"' + b.join(',') + '"');
  else console.log('-');
}
solve();