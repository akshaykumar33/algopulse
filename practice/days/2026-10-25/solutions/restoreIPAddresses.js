var restoreIpAddresses = function(s) {
  const res = [];
  function bt(start, parts) {
    if (parts.length === 4) {
      if (start === s.length) res.push(parts.join('.'));
      return;
    }
    for (let len = 1; len <= 3 && start + len <= s.length; len++) {
      const part = s.slice(start, start + len);
      if (part.length > 1 && part[0] === '0') break;
      const num = parseInt(part, 10);
      if (num >= 0 && num <= 255) {
        parts.push(part);
        bt(start + len, parts);
        parts.pop();
      }
    }
  }
  bt(0, []);
  return res;
};

var solve = restoreIpAddresses;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = restoreIpAddresses;
