var validateStackSequences = function(pushed, popped) {
  const st = [];
  let j = 0;
  for (let i = 0; i < pushed.length; i++) {
    st.push(pushed[i]);
    while (st.length > 0 && st[st.length - 1] === popped[j]) {
      st.pop();
      j++;
    }
  }
  return j === popped.length;
};

var solve = validateStackSequences;

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
  } catch (err) {}
}
module.exports = solve;
