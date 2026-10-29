var originalDigits = function(s) {
  const count = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }

  const out = new Int32Array(10);
  out[0] = count[25]; // 'z'
  out[2] = count[22]; // 'w'
  out[4] = count[20]; // 'u'
  out[6] = count[23]; // 'x'
  out[8] = count[6];  // 'g'

  out[3] = count[7] - out[8]; // 'h' - 8
  out[5] = count[5] - out[4]; // 'f' - 4
  out[7] = count[18] - out[6]; // 's' - 6
  out[1] = count[14] - out[0] - out[2] - out[4]; // 'o' - 0, 2, 4
  out[9] = count[8] - out[5] - out[6] - out[8]; // 'i' - 5, 6, 8

  let res = '';
  for (let i = 0; i <= 9; i++) {
    if (out[i] > 0) {
      res += String(i).repeat(out[i]);
    }
  }
  return res;
};

var solve = typeof originalDigits !== 'undefined' ? originalDigits : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
