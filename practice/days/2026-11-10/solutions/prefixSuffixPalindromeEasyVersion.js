const fs = require('fs');

function isPalindrome(str, start, end) {
  while (start < end) {
    if (str.charCodeAt(start) !== str.charCodeAt(end)) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const t = parseInt(tokens[0], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[1 + tc];
    let l = 0;
    let r = s.length - 1;

    while (l < r && s.charCodeAt(l) === s.charCodeAt(r)) {
      l++;
      r--;
    }

    if (l >= r) {
      out.push(s);
      continue;
    }

    let prefLen = 0;
    for (let len = r - l + 1; len >= 1; len--) {
      if (isPalindrome(s, l, l + len - 1)) {
        prefLen = len;
        break;
      }
    }

    let suffLen = 0;
    for (let len = r - l + 1; len >= 1; len--) {
      if (isPalindrome(s, r - len + 1, r)) {
        suffLen = len;
        break;
      }
    }

    let mid = '';
    if (prefLen >= suffLen) {
      mid = s.slice(l, l + prefLen);
    } else {
      mid = s.slice(r - suffLen + 1, r + 1);
    }

    const res = s.slice(0, l) + mid + s.slice(r + 1);
    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();
