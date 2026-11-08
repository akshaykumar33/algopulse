var maxRepOpt1 = function(text) {
  const n = text.length;
  const cnt = new Int32Array(26);
  for (let i = 0; i < n; i++) {
    cnt[text.charCodeAt(i) - 97]++;
  }
  let ans = 0;
  let i = 0;
  while (i < n) {
    let j = i;
    while (j < n && text[j] === text[i]) j++;
    const l = j - i;
    let k = j + 1;
    while (k < n && text[k] === text[i]) k++;
    const r = k - j - 1;
    const total = cnt[text.charCodeAt(i) - 97];
    ans = Math.max(ans, Math.min(l + r + 1, total));
    i = j;
  }
  return ans;
};

var solve = maxRepOpt1;
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
  } catch (err) {}
}
module.exports = solve;
