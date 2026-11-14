var removeOccurrences = function(s, part) {
  const stack = [];
  const m = part.length;

  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
    if (stack.length >= m) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (stack[stack.length - m + j] !== part[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        for (let j = 0; j < m; j++) stack.pop();
      }
    }
  }
  return stack.join('');
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(removeOccurrences(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = removeOccurrences;
