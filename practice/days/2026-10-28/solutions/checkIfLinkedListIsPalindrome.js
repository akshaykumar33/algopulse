function isPalindrome(head) {
  const vals = [];
  let curr = head;
  while (curr !== null) {
    vals.push(curr.val);
    curr = curr.next;
  }
  let l = 0;
  let r = vals.length - 1;
  while (l < r) {
    if (vals[l] !== vals[r]) return false;
    l++;
    r--;
  }
  return true;
}

// ---------------- LOCAL TEST HARNESS ----------------
const fs = require('fs');

function solve() {
  let input;
  try {
    input = fs.readFileSync(0, 'utf-8');
  } catch (e) {
    return;
  }
  if (!input) return;
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const out = [];

  while (ptr < tokens.length) {
    const n = parseInt(tokens[ptr++], 10);
    if (isNaN(n)) break;
    const vals = [];
    for (let i = 0; i < n; i++) {
      vals.push(parseInt(tokens[ptr++], 10));
    }
    let ok = true;
    for (let i = 0, j = n - 1; i < j; i++, j--) {
      if (vals[i] !== vals[j]) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
