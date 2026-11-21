var taskSchedulerII = function(tasks, space) {
  const lastDay = new Map();
  let day = 0;
  for (let i = 0; i < tasks.length; i++) {
    day++;
    const t = tasks[i];
    if (lastDay.has(t)) {
      const prev = lastDay.get(t);
      if (day - prev <= space) {
        day = prev + space + 1;
      }
    }
    lastDay.set(t, day);
  }
  return day;
};

var solve = taskSchedulerII;

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

module.exports = taskSchedulerII;