var sequentialDigits = function(low, high) {
  const ans = [];
  const sample = "123456789";
  for (let len = 1; len <= 9; len++) {
    for (let i = 0; i + len <= 9; i++) {
      const num = parseInt(sample.substr(i, len));
      if (num >= low && num <= high) {
        ans.push(num);
      }
    }
  }
  ans.sort((a, b) => a - b);
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const low = JSON.parse(lines[i]);
        const high = JSON.parse(lines[i+1]);
        const result = sequentialDigits(low, high);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = sequentialDigits;
