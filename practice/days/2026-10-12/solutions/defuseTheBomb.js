var solve = function(code, k) {
    const n = code.length;
    const ans = new Array(n).fill(0);
    if (k === 0) return ans;
    if (k > 0) {
        let sum = 0;
        for (let j = 1; j <= k; j++) {
            sum += code[j % n];
        }
        for (let i = 0; i < n; i++) {
            ans[i] = sum;
            sum -= code[(i + 1) % n];
            sum += code[(i + 1 + k) % n];
        }
    } else {
        let sum = 0;
        const absK = -k;
        for (let j = 1; j <= absK; j++) {
            sum += code[(n - j + n) % n];
        }
        for (let i = 0; i < n; i++) {
            ans[i] = sum;
            sum -= code[(i - absK + n) % n];
            sum += code[i % n];
        }
    }
    return ans;
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
