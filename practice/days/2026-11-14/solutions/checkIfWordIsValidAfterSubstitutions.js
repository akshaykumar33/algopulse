var isValid = function(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
    const len = stack.length;
    if (len >= 3 && stack[len - 3] === 'a' && stack[len - 2] === 'b' && stack[len - 1] === 'c') {
      stack.pop();
      stack.pop();
      stack.pop();
    }
  }
  return stack.length === 0;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(isValid(JSON.parse(l))));
  }
}

module.exports = isValid;
