var equalSubstring = function(s, t, maxCost) {
  const n = s.length;
  let left = 0;
  let cost = 0;
  let ans = 0;
  for (let right = 0; right < n; right++) {
    cost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));
    while (cost > maxCost) {
      cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
      left++;
    }
    const len = right - left + 1;
    if (len > ans) ans = len;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === equalSubstring.length && !(Array.isArray(parsed[0]) && parsed[0].length === equalSubstring.length && parsed.every((p) => Array.isArray(p) && p.length === equalSubstring.length))) {
      console.log(JSON.stringify(equalSubstring(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(equalSubstring(...p)));
      }
    }
  }
}

module.exports = equalSubstring;
