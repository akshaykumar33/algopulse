var xorOperation = function(n, start) {
  const f = (x) => {
    if (x < 0) return 0;
    const rem = x % 4;
    if (rem === 0) return x;
    if (rem === 1) return 1;
    if (rem === 2) return x + 1;
    return 0;
  };
  const s = start >> 1;
  const p = f(s - 1) ^ f(s + n - 1);
  return (p << 1) | ((start & 1) & (n & 1));
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && xorOperation.length > 1 ? xorOperation(...parsed) : xorOperation(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(xorOperation(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = xorOperation;
