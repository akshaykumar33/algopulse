var uniformArray = function(nums1) {
  return true;
};

var constructUniformParityArray = uniformArray;
var constructUniformParityArrayI = uniformArray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = uniformArray(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(uniformArray(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = uniformArray;
