var countStudents = function(students, sandwiches) {
    let cnt = [0, 0];
    for (let s of students) {
        cnt[s]++;
    }
    for (let i = 0; i < sandwiches.length; i++) {
        let s = sandwiches[i];
        if (cnt[s] > 0) {
            cnt[s]--;
        } else {
            return sandwiches.length - i;
        }
    }
    return 0;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
          const students = JSON.parse(lines[i]);
          const sandwiches = JSON.parse(lines[i+1]);
          const result = countStudents(students, sandwiches);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = countStudents;
