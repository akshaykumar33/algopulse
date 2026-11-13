var nextBeautifulNumber = function(n) {
  const isBalanced = (x) => {
    let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, c7 = 0;
    while (x > 0) {
      const d = x % 10;
      if (d === 0 || d > 7) return false;
      if (d === 1) c1++;
      else if (d === 2) c2++;
      else if (d === 3) c3++;
      else if (d === 4) c4++;
      else if (d === 5) c5++;
      else if (d === 6) c6++;
      else if (d === 7) c7++;
      x = Math.floor(x / 10);
    }
    if (c1 !== 0 && c1 !== 1) return false;
    if (c2 !== 0 && c2 !== 2) return false;
    if (c3 !== 0 && c3 !== 3) return false;
    if (c4 !== 0 && c4 !== 4) return false;
    if (c5 !== 0 && c5 !== 5) return false;
    if (c6 !== 0 && c6 !== 6) return false;
    if (c7 !== 0 && c7 !== 7) return false;
    return true;
  };

  for (let x = n + 1; ; x++) {
    if (isBalanced(x)) return x;
  }
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(nextBeautifulNumber(JSON.parse(line))));
    }
  }
}

module.exports = nextBeautifulNumber;
