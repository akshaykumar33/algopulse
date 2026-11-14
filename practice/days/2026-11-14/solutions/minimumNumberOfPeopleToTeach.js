var minimumTeachings = function(n, languages, friendships) {
  const m = languages.length;
  const langSets = languages.map(list => new Set(list));

  const broken = new Set();
  for (const [u, v] of friendships) {
    const uIdx = u - 1, vIdx = v - 1;
    let share = false;
    for (const lang of langSets[uIdx]) {
      if (langSets[vIdx].has(lang)) {
        share = true;
        break;
      }
    }
    if (!share) {
      broken.add(uIdx);
      broken.add(vIdx);
    }
  }

  if (broken.size === 0) return 0;

  let minTeach = broken.size;
  for (let l = 1; l <= n; l++) {
    let count = 0;
    for (const user of broken) {
      if (!langSets[user].has(l)) count++;
    }
    if (count < minTeach) minTeach = count;
  }

  return minTeach;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 3) {
      console.log(JSON.stringify(minimumTeachings(JSON.parse(lines[i]), JSON.parse(lines[i + 1]), JSON.parse(lines[i + 2]))));
    }
  }
}

module.exports = minimumTeachings;
