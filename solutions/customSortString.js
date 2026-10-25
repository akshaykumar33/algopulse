var customSortString = function(order, s) {
  const cnt = new Map();
  for (const ch of s) {
    cnt.set(ch, (cnt.get(ch) || 0) + 1);
  }
  let res = '';
  for (const ch of order) {
    if (cnt.has(ch)) {
      res += ch.repeat(cnt.get(ch));
      cnt.delete(ch);
    }
  }
  for (const [ch, freq] of cnt) {
    res += ch.repeat(freq);
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const order = JSON.parse(lines[i]);
        const s = JSON.parse(lines[i+1]);
        const result = customSortString(order, s);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = customSortString;
