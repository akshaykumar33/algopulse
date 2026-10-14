var licenseKeyFormatting = function(s, k) {
    let clean = s.replace(/-/g, '').toUpperCase();
    let n = clean.length;
    let firstLen = n % k;
    let res = [];
    let i = 0;
    if (firstLen > 0) {
        res.push(clean.substring(0, firstLen));
        i = firstLen;
    }
    while (i < n) {
        res.push(clean.substring(i, i + k));
        i += k;
    }
    return res.join('-');
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const result = licenseKeyFormatting(s, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = licenseKeyFormatting;
