var minSwaps = function(s) {
  const n = s.length;
  let c0 = 0, c1 = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === '0') c0++;
    else c1++;
  }

  if (Math.abs(c0 - c1) > 1) return -1;

  function check(startChar) {
    let diff = 0;
    let expected = startChar;
    for (let i = 0; i < n; i++) {
      if (s[i] !== expected) diff++;
      expected = expected === '0' ? '1' : '0';
    }
    return diff / 2;
  }

  if (c0 > c1) return check('0');
  if (c1 > c0) return check('1');
  return Math.min(check('0'), check('1'));
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(minSwaps(JSON.parse(lines[i]))));
    }
  }
}

module.exports = minSwaps;
