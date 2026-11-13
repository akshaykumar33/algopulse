var reorderedPowerOf2 = function(n) {
  const norm = (val) => String(val).split('').sort().join('');
  const target = norm(n);
  for (let i = 0; i < 31; i++) {
    if (norm(1 << i) === target) return true;
  }
  return false;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(reorderedPowerOf2(JSON.parse(line))));
    }
  }
}

module.exports = reorderedPowerOf2;
