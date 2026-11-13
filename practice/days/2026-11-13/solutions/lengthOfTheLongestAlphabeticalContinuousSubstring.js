var longestContinuousSubstring = function(s) {
  let maxLen = 1;
  let curLen = 1;
  for (let i = 1; i < s.length; i++) {
    if (s.charCodeAt(i) === s.charCodeAt(i - 1) + 1) {
      curLen++;
      if (curLen > maxLen) maxLen = curLen;
    } else {
      curLen = 1;
    }
  }
  return maxLen;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(longestContinuousSubstring(JSON.parse(line))));
    }
  }
}

module.exports = longestContinuousSubstring;
