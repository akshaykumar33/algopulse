var shiftingLetters = function(s, shifts) {
  const n = s.length;
  const diff = new Int32Array(n + 1);

  for (let i = 0; i < shifts.length; i++) {
    const l = shifts[i][0];
    const r = shifts[i][1];
    const d = shifts[i][2] === 1 ? 1 : -1;
    diff[l] += d;
    diff[r + 1] -= d;
  }

  const arr = s.split('');
  let shift = 0;

  for (let i = 0; i < n; i++) {
    shift = (shift + diff[i]) % 26;
    const code = s.charCodeAt(i) - 97;
    const newCode = ((code + shift) % 26 + 26) % 26;
    arr[i] = String.fromCharCode(97 + newCode);
  }

  return arr.join('');
};

var solve = shiftingLetters;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
