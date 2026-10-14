var shortestToChar = function(s, c) {
  const n = s.length;
  const res = new Array(n);
  let pos = -10001;
  for (let i = 0; i < n; i++) {
    if (s[i] === c) pos = i;
    res[i] = i - pos;
  }
  pos = 20001;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === c) pos = i;
    res[i] = Math.min(res[i], pos - i);
  }
  return res;
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
          const result = Array.isArray(parsed) && shortestToChar.length > 1 ? shortestToChar(...parsed) : shortestToChar(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(shortestToChar(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = shortestToChar;
