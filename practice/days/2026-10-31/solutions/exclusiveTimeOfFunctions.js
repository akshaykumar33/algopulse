var exclusiveTime = function(n, logs) {
    let ans = new Array(n).fill(0);
    let stack = [];
    let prevTime = 0;
    for (let log of logs) {
        let parts = log.split(':');
        let id = Number(parts[0]);
        let type = parts[1];
        let time = Number(parts[2]);
        if (type === 'start') {
            if (stack.length > 0) {
                ans[stack[stack.length - 1]] += time - prevTime;
            }
            stack.push(id);
            prevTime = time;
        } else {
            let curId = stack.pop();
            ans[curId] += time - prevTime + 1;
            prevTime = time + 1;
        }
    }
    return ans;
};
var solve = exclusiveTime;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let n = Number(lines[0]);
      let logs = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(n, logs)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
