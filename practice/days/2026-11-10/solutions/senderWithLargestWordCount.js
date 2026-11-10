var largestWordCount = function(messages, senders) {
  const counts = new Map();
  const n = messages.length;
  for (let i = 0; i < n; i++) {
    const msg = messages[i];
    let words = 1;
    for (let j = 0; j < msg.length; j++) {
      if (msg.charCodeAt(j) === 32) words++;
    }
    const sender = senders[i];
    counts.set(sender, (counts.get(sender) || 0) + words);
  }
  let bestSender = '';
  let maxCount = -1;
  for (const [sender, count] of counts.entries()) {
    if (count > maxCount || (count === maxCount && sender > bestSender)) {
      maxCount = count;
      bestSender = sender;
    }
  }
  return bestSender;
};

var solve = largestWordCount;

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
  } catch (err) {}
}
module.exports = solve;
