const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const l = parseInt(input[0], 10);
  const s = input[1];

  function addStrings(a, b) {
    let i = a.length - 1, j = b.length - 1, carry = 0;
    const res = [];
    while (i >= 0 || j >= 0 || carry) {
      let sum = carry;
      if (i >= 0) sum += a.charCodeAt(i--) - 48;
      if (j >= 0) sum += b.charCodeAt(j--) - 48;
      res.push(sum % 10);
      carry = Math.floor(sum / 10);
    }
    return res.reverse().join('');
  }

  function compareStrings(a, b) {
    if (a.length !== b.length) return a.length < b.length ? -1 : 1;
    return a < b ? -1 : a > b ? 1 : 0;
  }

  const mid = Math.floor(l / 2);
  const candidates = [];

  for (let i = mid; i < l; i++) {
    if (s[i] !== '0') {
      candidates.push(addStrings(s.slice(0, i), s.slice(i)));
      break;
    }
  }

  for (let i = mid - 1; i >= 1; i--) {
    if (s[i] !== '0') {
      candidates.push(addStrings(s.slice(0, i), s.slice(i)));
      break;
    }
  }

  if (mid + 1 < l && s[mid + 1] !== '0') {
    candidates.push(addStrings(s.slice(0, mid + 1), s.slice(mid + 1)));
  }

  let minAns = candidates[0];
  for (let i = 1; i < candidates.length; i++) {
    if (compareStrings(candidates[i], minAns) < 0) minAns = candidates[i];
  }

  console.log(minAns);
}

solve();
