var maximumSwap = function(num) {
    const arr = String(num).split('');
    const last = new Array(10).fill(-1);
    for (let i = 0; i < arr.length; i++) {
        last[arr[i].charCodeAt(0) - 48] = i;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let d = 9; d > arr[i].charCodeAt(0) - 48; d--) {
            if (last[d] > i) {
                const tmp = arr[i];
                arr[i] = arr[last[d]];
                arr[last[d]] = tmp;
                return parseInt(arr.join(''), 10);
            }
        }
    }
    return num;
};
var solve = typeof maximumSwap !== 'undefined' ? maximumSwap : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const arg = JSON.parse(line);
        const result = solve(arg);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
