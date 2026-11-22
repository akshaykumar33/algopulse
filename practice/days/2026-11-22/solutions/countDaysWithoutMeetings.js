var countDays = function(days, meetings) {
  meetings.sort((a, b) => a[0] - b[0]);
  let covered = 0;
  let curStart = -1, curEnd = -1;
  for (let i = 0; i < meetings.length; i++) {
    const [s, e] = meetings[i];
    if (curStart === -1) {
      curStart = s;
      curEnd = e;
    } else if (s <= curEnd) {
      curEnd = Math.max(curEnd, e);
    } else {
      covered += (curEnd - curStart + 1);
      curStart = s;
      curEnd = e;
    }
  }
  if (curStart !== -1) {
    covered += (curEnd - curStart + 1);
  }
  return days - covered;
};
var solve = countDays;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}
module.exports = countDays;