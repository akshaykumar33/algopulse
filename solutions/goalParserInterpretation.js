var interpret = function(command) {
  let res = '';
  for (let i = 0; i < command.length; ) {
    if (command[i] === 'G') {
      res += 'G';
      i++;
    } else if (command[i + 1] === ')') {
      res += 'o';
      i += 2;
    } else {
      res += 'al';
      i += 4;
    }
  }
  return res;
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
          const result = Array.isArray(parsed) && interpret.length > 1 ? interpret(...parsed) : interpret(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(interpret(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = interpret;
