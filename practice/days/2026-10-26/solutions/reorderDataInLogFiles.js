var reorderLogFiles = function(logs) {
    return logs.sort((a, b) => {
        const i1 = a.indexOf(' ');
        const i2 = b.indexOf(' ');
        const id1 = a.slice(0, i1);
        const id2 = b.slice(0, i2);
        const rest1 = a.slice(i1 + 1);
        const rest2 = b.slice(i2 + 1);
        
        const isDigit1 = !isNaN(rest1[0]) && rest1[0] !== ' ';
        const isDigit2 = !isNaN(rest2[0]) && rest2[0] !== ' ';
        
        if (!isDigit1 && !isDigit2) {
            const cmp = rest1.localeCompare(rest2);
            if (cmp !== 0) return cmp;
            return id1.localeCompare(id2);
        }
        
        if (!isDigit1 && isDigit2) return -1;
        if (isDigit1 && !isDigit2) return 1;
        return 0;
    });
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
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(reorderLogFiles(JSON.parse(line))));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = reorderLogFiles;
