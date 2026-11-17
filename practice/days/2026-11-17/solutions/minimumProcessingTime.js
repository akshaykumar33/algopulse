var minProcessingTime = function(processorTime, tasks) {
  processorTime.sort((a, b) => a - b);
  tasks.sort((a, b) => b - a);

  let ans = 0;
  for (let i = 0; i < processorTime.length; i++) {
    const finish = processorTime[i] + tasks[4 * i];
    if (finish > ans) {
      ans = finish;
    }
  }

  return ans;
};

var solve = minProcessingTime;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
