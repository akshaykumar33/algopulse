var maskPII = function(s) {
  if (s.includes('@')) {
    s = s.toLowerCase();
    const at = s.indexOf('@');
    const name = s.slice(0, at);
    const domain = s.slice(at);
    return name[0] + '*****' + name[name.length - 1] + domain;
  }

  const digits = s.replace(/\D/g, '');
  const local = '***-***-' + digits.slice(-4);
  const countryLen = digits.length - 10;
  if (countryLen === 0) return local;
  return '+' + '*'.repeat(countryLen) + '-' + local;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(maskPII(JSON.parse(l))));
  }
}

module.exports = maskPII;
