const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const count = {
      cakewalk: 0,
      simple: 0,
      easy: 0,
      'easy-medium': 0,
      medium: 0,
      'medium-hard': 0,
      hard: 0
    };
    for (let i = 0; i < n; i++) {
      const s = input[idx++];
      if (count[s] !== undefined) count[s]++;
    }

    const hasCakewalk = count.cakewalk > 0;
    const hasSimple = count.simple > 0;
    const hasEasy = count.easy > 0;
    const hasMed = (count['easy-medium'] + count.medium) > 0;
    const hasHard = (count['medium-hard'] + count.hard) > 0;

    if (hasCakewalk && hasSimple && hasEasy && hasMed && hasHard) {
      out.push("yes");
    } else {
      out.push("no");
    }
  }
  console.log(out.join('\n'));
}

solve();
