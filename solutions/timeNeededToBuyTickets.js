var timeRequiredToBuy = function(tickets, k) {
  let ans = 0;
  for (let i = 0; i < tickets.length; i++) {
    if (i <= k) {
      ans += Math.min(tickets[i], tickets[k]);
    } else {
      ans += Math.min(tickets[i], tickets[k] - 1);
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
      for (let i = 0; i < lines.length; i += 2) {
        const tickets = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = timeRequiredToBuy(tickets, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = timeRequiredToBuy;
