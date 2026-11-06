var canConstruct = function(s, k) {
  if (k > s.length) return false;

  const count = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }

  let odd = 0;
  for (let i = 0; i < 26; i++) {
    if (count[i] % 2 !== 0) odd++;
  }

  return odd <= k;
};

var solve = typeof canConstruct !== 'undefined' ? canConstruct : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(s, k)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

