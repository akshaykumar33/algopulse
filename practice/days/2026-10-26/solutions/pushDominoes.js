var pushDominoes = function(dominoes) {
    let n = dominoes.length;
    let arr = dominoes.split('');
    let forces = new Array(n).fill(0);
    let f = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] === 'R') f = n;
        else if (arr[i] === 'L') f = 0;
        else f = Math.max(0, f - 1);
        forces[i] += f;
    }
    f = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] === 'L') f = n;
        else if (arr[i] === 'R') f = 0;
        else f = Math.max(0, f - 1);
        forces[i] -= f;
    }
    let res = [];
    for (let i = 0; i < n; i++) {
        if (forces[i] > 0) res.push('R');
        else if (forces[i] < 0) res.push('L');
        else res.push('.');
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
          const result = Array.isArray(parsed) && pushDominoes.length > 1 ? pushDominoes(...parsed) : pushDominoes(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(pushDominoes(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = pushDominoes;
