var maximumBinaryString = function(binary) {
  const n = binary.length;
  const firstZero = binary.indexOf('0');
  if (firstZero === -1) return binary;
  let zeros = 0;
  for (let i = firstZero; i < n; i++) {
    if (binary[i] === '0') zeros++;
  }
  if (zeros <= 1) return binary;
  const zeroPos = firstZero + zeros - 1;
  const res = new Array(n).fill('1');
  res[zeroPos] = '0';
  return res.join('');
};

var solve = maximumBinaryString;

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
    console.error(err);
  }
}

module.exports = solve;
