var compress = function(chars) {
    let write = 0;
    let i = 0;
    while (i < chars.length) {
        let j = i;
        while (j < chars.length && chars[j] === chars[i]) {
            j++;
        }
        chars[write++] = chars[i];
        let count = j - i;
        if (count > 1) {
            let s = count.toString();
            for (let k = 0; k < s.length; k++) {
                chars[write++] = s[k];
            }
        }
        i = j;
    }
    return write;
};
var solve = compress;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(solve(parsed)));
    }
  }
}
module.exports = solve;
