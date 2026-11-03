var calculate = function(s) {
    let stack = [];
    let cur = 0;
    let op = '+';
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (c >= '0' && c <= '9') {
            cur = cur * 10 + (c.charCodeAt(0) - 48);
        }
        if ((c < '0' && c !== ' ') || i === s.length - 1) {
            if (op === '+') {
                stack.push(cur);
            } else if (op === '-') {
                stack.push(-cur);
            } else if (op === '*') {
                stack.push(stack.pop() * cur);
            } else if (op === '/') {
                let prev = stack.pop();
                stack.push(prev < 0 ? Math.ceil(prev / cur) : Math.floor(prev / cur));
            }
            op = c;
            cur = 0;
        }
    }
    let sum = 0;
    while (stack.length > 0) {
        sum += stack.pop();
    }
    return sum;
};
var solve = calculate;

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
