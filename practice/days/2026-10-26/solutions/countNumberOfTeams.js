var numTeams = function(rating) {
    let n = rating.length;
    let ans = 0;
    for (let j = 0; j < n; j++) {
        let leftLess = 0, leftGreater = 0;
        let rightLess = 0, rightGreater = 0;
        for (let i = 0; i < j; i++) {
            if (rating[i] < rating[j]) leftLess++;
            if (rating[i] > rating[j]) leftGreater++;
        }
        for (let k = j + 1; k < n; k++) {
            if (rating[k] > rating[j]) rightGreater++;
            if (rating[k] < rating[j]) rightLess++;
        }
        ans += leftLess * rightGreater + leftGreater * rightLess;
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
          const result = Array.isArray(parsed) && numTeams.length > 1 ? numTeams(...parsed) : numTeams(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(numTeams(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = numTeams;
