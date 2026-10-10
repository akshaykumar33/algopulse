var numberOfSteps = function(num) {
  let steps = 0;
  while (num > 0) {
    if (num % 2 === 0) {
      num /= 2;
    } else {
      num -= 1;
    }
    steps++;
  }
  return steps;
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
          const result = Array.isArray(parsed) && numberOfSteps.length > 1 ? numberOfSteps(...parsed) : numberOfSteps(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(numberOfSteps(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = numberOfSteps;
