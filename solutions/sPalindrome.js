const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;

  const mirrorMap = {
    'A': 'A', 'H': 'H', 'I': 'I', 'M': 'M', 'O': 'O',
    'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y',
    'o': 'o', 'v': 'v', 'w': 'w', 'x': 'x',
    'b': 'd', 'd': 'b', 'p': 'q', 'q': 'p'
  };

  let left = 0;
  let right = s.length - 1;

  while (left <= right) {
    const c1 = s[left];
    const c2 = s[right];
    if (!mirrorMap[c1] || mirrorMap[c1] !== c2) {
      console.log('NIE');
      return;
    }
    left++;
    right--;
  }

  console.log('TAK');
}

solve();
