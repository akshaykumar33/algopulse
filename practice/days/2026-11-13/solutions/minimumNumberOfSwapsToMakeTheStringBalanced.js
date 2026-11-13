var minSwaps = function(s) {
  let bal = 0;
  let maxImbalance = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) === 91) {
      bal++;
    } else {
      bal--;
    }
    if (-bal > maxImbalance) {
      maxImbalance = -bal;
    }
  }
  return Math.floor((maxImbalance + 1) / 2);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(minSwaps(JSON.parse(line))));
    }
  }
}

module.exports = minSwaps;
