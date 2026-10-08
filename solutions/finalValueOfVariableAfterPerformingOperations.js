var finalValueAfterOperations = function(operations) {
  let ans = 0;
  for (let i = 0; i < operations.length; i++) {
    if (operations[i][1] === '+') {
      ans++;
    } else {
      ans--;
    }
  }
  return ans;
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
          const result = Array.isArray(parsed) && finalValueAfterOperations.length > 1 ? finalValueAfterOperations(...parsed) : finalValueAfterOperations(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(finalValueAfterOperations(line)));
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}
module.exports = finalValueAfterOperations;
