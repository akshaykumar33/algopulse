var removeDuplicateLetters = function(s) {
  const lastIndex = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    lastIndex[s.charCodeAt(i) - 97] = i;
  }

  const seen = new Uint8Array(26);
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i) - 97;
    if (seen[code]) continue;

    while (
      stack.length > 0 &&
      stack[stack.length - 1] > s[i] &&
      lastIndex[stack[stack.length - 1].charCodeAt(0) - 97] > i
    ) {
      const popped = stack.pop();
      seen[popped.charCodeAt(0) - 97] = 0;
    }

    stack.push(s[i]);
    seen[code] = 1;
  }

  return stack.join('');
};

var solve = function(s) {
  return removeDuplicateLetters(s);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

