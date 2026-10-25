var solve = function(s) {
    let stack = [];
    let curNum = 0;
    let curStr = '';
    for (let c of s) {
        if (c === '[') {
            stack.push(curStr);
            stack.push(curNum);
            curStr = '';
            curNum = 0;
        } else if (c === ']') {
            let num = stack.pop();
            let prevStr = stack.pop();
            curStr = prevStr + curStr.repeat(num);
        } else if (!isNaN(c)) {
            curNum = curNum * 10 + Number(c);
        } else {
            curStr += c;
        }
    }
    return curStr;
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
