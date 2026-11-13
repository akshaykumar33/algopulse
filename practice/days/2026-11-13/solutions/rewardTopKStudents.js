var topStudents = function(positive_feedback, negative_feedback, report, student_id, k) {
  const pos = new Set(positive_feedback);
  const neg = new Set(negative_feedback);
  const n = report.length;
  const scored = new Array(n);

  for (let i = 0; i < n; i++) {
    const words = report[i].split(' ');
    let score = 0;
    for (let j = 0; j < words.length; j++) {
      const w = words[j];
      if (pos.has(w)) score += 3;
      else if (neg.has(w)) score -= 1;
    }
    scored[i] = { id: student_id[i], score };
  }

  scored.sort((a, b) => b.score !== a.score ? b.score - a.score : a.id - b.id);

  const ans = new Array(k);
  for (let i = 0; i < k; i++) {
    ans[i] = scored[i].id;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      try {
        const p = JSON.parse(l);
        return Array.isArray(p) && p.length === 5;
      } catch (_) {
        return false;
      }
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(topStudents(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 4 < lines.length; i += 5) {
        const args = lines.slice(i, i + 5).map((l) => JSON.parse(l));
        console.log(JSON.stringify(topStudents(...args)));
      }
    }
  }
}

module.exports = topStudents;
