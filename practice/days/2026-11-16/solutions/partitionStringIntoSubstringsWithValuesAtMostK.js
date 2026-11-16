var minimumPartition = function(s, k) {
  let count = 0;
  let cur = 0;

  for (let i = 0; i < s.length; i++) {
    const digit = s.charCodeAt(i) - 48;
    if (digit > k) return -1;
    if (cur * 10 + digit <= k) {
      cur = cur * 10 + digit;
    } else {
      count++;
      cur = digit;
    }
  }
  if (cur > 0) count++;
  return count;
};

var solve = minimumPartition;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
