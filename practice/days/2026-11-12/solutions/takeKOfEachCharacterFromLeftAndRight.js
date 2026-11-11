var takeCharacters = function(s, k) {
  const n = s.length;
  const tot = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    tot[s.charCodeAt(i) - 97]++;
  }
  if (tot[0] < k || tot[1] < k || tot[2] < k) return -1;

  const lim0 = tot[0] - k;
  const lim1 = tot[1] - k;
  const lim2 = tot[2] - k;
  const win = [0, 0, 0];
  let left = 0;
  let best = 0;
  for (let right = 0; right < n; right++) {
    win[s.charCodeAt(right) - 97]++;
    while (win[0] > lim0 || win[1] > lim1 || win[2] > lim2) {
      win[s.charCodeAt(left++) - 97]--;
    }
    const len = right - left + 1;
    if (len > best) best = len;
  }
  return n - best;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every((p) => Array.isArray(p) && p.length === 2 && typeof p[0] === 'string');
    if (parsed.length === 2 && !isPacked) {
      console.log(JSON.stringify(takeCharacters(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(takeCharacters(...p)));
      }
    }
  }
}

module.exports = takeCharacters;
