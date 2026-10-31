var longestAbsoluteFilePath = function(input) {
    const lines = input.split('\n');
    const depthLen = {};
    let maxLen = 0;
    
    for (const line of lines) {
        let depth = 0;
        while (depth < line.length && line[depth] === '\t') {
            depth++;
        }
        const name = line.slice(depth);
        const isFile = name.includes('.');
        const curLen = (depth > 0 ? depthLen[depth - 1] + 1 : 0) + name.length;
        
        if (isFile) {
            maxLen = Math.max(maxLen, curLen);
        } else {
            depthLen[depth] = curLen;
        }
    }
    
    return maxLen;
};

var solve = typeof longestAbsoluteFilePath !== 'undefined' ? longestAbsoluteFilePath : null;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
