var queryString = function(s, n) {
  const len = s.length;
  const seen = new Set();
  for (let i = 0; i < len; i++) {
    if (s[i] === '0') continue;
    let val = 0;
    for (let j = i; j < len; j++) {
      val = val * 2 + (s.charCodeAt(j) - 48);
      if (val > n) break;
      seen.add(val);
    }
  }
  return seen.size === n;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && typeof p[0] === 'string';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(queryString(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(queryString(...args)));
      }
    }
  }
}

module.exports = queryString;
