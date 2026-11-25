var primePalindrome = function(n) {
  if (n <= 2) return 2;
  if (n <= 3) return 3;
  if (n <= 5) return 5;
  if (n <= 7) return 7;
  if (n <= 11) return 11;
  const isPrime = (v) => {
    if (v < 2) return false;
    if (v % 2 === 0) return v === 2;
    if (v % 3 === 0) return v === 3;
    for (let d = 5; d * d <= v; d += 6) {
      if (v % d === 0 || v % (d + 2) === 0) return false;
    }
    return true;
  };
  for (let x = 10; x <= 20000; x++) {
    let pal = x;
    let t = Math.floor(x / 10);
    while (t > 0) {
      pal = pal * 10 + (t % 10);
      t = Math.floor(t / 10);
    }
    if (pal >= n && isPrime(pal)) return pal;
  }
  return -1;
};

var solve = primePalindrome;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const n = JSON.parse(lines[i]);
      out.push(JSON.stringify(primePalindrome(n)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = primePalindrome;
