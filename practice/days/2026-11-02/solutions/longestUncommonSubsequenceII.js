var isSubsequence = function(s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }
    return i === s.length;
};

var findLUSlength = function(strs) {
    let ans = -1;
    for (let i = 0; i < strs.length; i++) {
        let ok = true;
        for (let j = 0; j < strs.length; j++) {
            if (i === j) continue;
            if (isSubsequence(strs[i], strs[j])) {
                ok = false;
                break;
            }
        }
        if (ok) {
            ans = Math.max(ans, strs[i].length);
        }
    }
    return ans;
};

var solve = typeof findLUSlength !== 'undefined' ? findLUSlength : null;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(findLUSlength(parsed)));
    }
  }
}

