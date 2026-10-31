var multiply = function(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    const m = num1.length;
    const n = num2.length;
    const pos = new Array(m + n).fill(0);
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const mul = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
            const p1 = i + j;
            const p2 = i + j + 1;
            const sum = mul + pos[p2];
            pos[p2] = sum % 10;
            pos[p1] += Math.floor(sum / 10);
        }
    }
    let res = '';
    let i = 0;
    while (i < pos.length && pos[i] === 0) {
        i++;
    }
    while (i < pos.length) {
        res += pos[i];
        i++;
    }
    return res;
};
var solve = typeof multiply !== 'undefined' ? multiply : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const n1 = JSON.parse(lines[i]);
        const n2 = JSON.parse(lines[i+1]);
        console.log(JSON.stringify(solve(n1, n2)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
