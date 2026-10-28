var maximumGain = function(s, x, y) {
  let firstPair = 'ab', firstScore = x;
  let secondPair = 'ba', secondScore = y;

  if (y > x) {
    firstPair = 'ba';
    firstScore = y;
    secondPair = 'ab';
    secondScore = x;
  }

  let totalScore = 0;
  const stack1 = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (stack1.length > 0 && stack1[stack1.length - 1] === firstPair[0] && c === firstPair[1]) {
      stack1.pop();
      totalScore += firstScore;
    } else {
      stack1.push(c);
    }
  }

  const stack2 = [];
  for (let i = 0; i < stack1.length; i++) {
    const c = stack1[i];
    if (stack2.length > 0 && stack2[stack2.length - 1] === secondPair[0] && c === secondPair[1]) {
      stack2.pop();
      totalScore += secondScore;
    } else {
      stack2.push(c);
    }
  }

  return totalScore;
};

var solve = function(s, x, y) {
  return maximumGain(s, x, y);
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

