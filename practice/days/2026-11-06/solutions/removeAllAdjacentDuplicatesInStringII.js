var removeDuplicates = function(s, k) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (stack.length > 0 && stack[stack.length - 1].ch === ch) {
      stack[stack.length - 1].cnt++;
      if (stack[stack.length - 1].cnt === k) {
        stack.pop();
      }
    } else {
      stack.push({ ch, cnt: 1 });
    }
  }

  let ans = '';
  for (let i = 0; i < stack.length; i++) {
    ans += stack[i].ch.repeat(stack[i].cnt);
  }

  return ans;
};

var solve = typeof removeDuplicates !== 'undefined' ? removeDuplicates : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(s, k)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

