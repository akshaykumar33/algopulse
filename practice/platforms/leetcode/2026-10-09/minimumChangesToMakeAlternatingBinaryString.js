var minOperations = function(s) {
    let cnt = 0;
    for (let i = 0; i < s.length; i++) {
        let expected = i % 2 === 0 ? '0' : '1';
        if (s[i] !== expected) {
            cnt++;
        }
    }
    return Math.min(cnt, s.length - cnt);
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
          const result = Array.isArray(parsed) && minOperations.length > 1 ? minOperations(...parsed) : minOperations(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(minOperations(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = minOperations;
