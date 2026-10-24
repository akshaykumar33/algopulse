var solve = function(s) {
    const cnt = new Array(26).fill(0);
    const n = s.length;
    for (let i = 0; i < n; i++) {
        cnt[s.charCodeAt(i) - 97]++;
    }
    const arr = [];
    for (let i = 0; i < 26; i++) {
        arr.push([cnt[i], String.fromCharCode(i + 97)]);
    }
    arr.sort((a, b) => b[0] - a[0]);
    
    const res = new Array(n);
    let idx = 0;
    for (let i = 0; i < 26; i++) {
        while (arr[i][0] > 0) {
            if (idx >= n) idx = 1;
            res[idx] = arr[i][1];
            idx += 2;
            arr[i][0]--;
        }
    }
    
    for (let i = 1; i < n; i++) {
        if (res[i] === res[i - 1]) return "";
    }
    return res.join('');
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
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
