var bestClosingTime = function(customers) {
  let pen = 0;
  let best = 0;
  let ans = 0;
  for (let i = 0; i < customers.length; i++) {
    pen += customers[i] === 'Y' ? -1 : 1;
    if (pen < best) {
      best = pen;
      ans = i + 1;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(bestClosingTime(JSON.parse(line))));
    }
  }
}

module.exports = bestClosingTime;
