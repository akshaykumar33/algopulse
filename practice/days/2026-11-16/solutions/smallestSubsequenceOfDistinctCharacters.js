var smallestSubsequence = function(s) {
  const last = new Int32Array(26);
  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - 97] = i;
  }

  const stack = [];
  const inStack = new Uint8Array(26);

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const code = ch.charCodeAt(0) - 97;
    if (inStack[code]) continue;

    while (
      stack.length > 0 &&
      stack[stack.length - 1] > ch &&
      last[stack[stack.length - 1].charCodeAt(0) - 97] > i
    ) {
      inStack[stack.pop().charCodeAt(0) - 97] = 0;
    }
    stack.push(ch);
    inStack[code] = 1;
  }
  return stack.join('');
};

var solve = smallestSubsequence;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
