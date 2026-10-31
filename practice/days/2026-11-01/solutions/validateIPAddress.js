var validateIPAddress = function(queryIP) {
    const isIPv4 = (s) => {
        const parts = s.split('.');
        if (parts.length !== 4) return false;
        for (const p of parts) {
            if (p.length === 0 || p.length > 3) return false;
            if (p[0] === '0' && p.length > 1) return false;
            for (let i = 0; i < p.length; i++) {
                const c = p.charCodeAt(i);
                if (c < 48 || c > 57) return false;
            }
            const val = Number(p);
            if (val < 0 || val > 255) return false;
        }
        return true;
    };

    const isIPv6 = (s) => {
        const parts = s.split(':');
        if (parts.length !== 8) return false;
        for (const p of parts) {
            if (p.length === 0 || p.length > 4) return false;
            for (let i = 0; i < p.length; i++) {
                const c = p.charCodeAt(i);
                const isDigit = c >= 48 && c <= 57;
                const isLower = c >= 97 && c <= 102;
                const isUpper = c >= 65 && c <= 70;
                if (!isDigit && !isLower && !isUpper) return false;
            }
        }
        return true;
    };

    if (isIPv4(queryIP)) return "IPv4";
    if (isIPv6(queryIP)) return "IPv6";
    return "Neither";
};

var solve = typeof validateIPAddress !== 'undefined' ? validateIPAddress : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
