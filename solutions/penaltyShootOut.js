const fs = require('fs');
function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0] === '') return;
  const out = [];
  for (let idx = 0; idx < lines.length; idx++) {
    const s = lines[idx].trim();
    if (s.length < 20) continue;
    let goalsA = 0, goalsB = 0;
    let remA = 5, remB = 5;
    let decided = false;

    for (let k = 0; k < 10; k++) {
      if (k % 2 === 0) {
        if (s[k] === '1') goalsA++;
        remA--;
      } else {
        if (s[k] === '1') goalsB++;
        remB--;
      }
      if (goalsA > goalsB + remB) {
        out.push('TEAM-A ' + (k + 1));
        decided = true;
        break;
      }
      if (goalsB > goalsA + remA) {
        out.push('TEAM-B ' + (k + 1));
        decided = true;
        break;
      }
    }

    if (!decided) {
      for (let round = 0; round < 5; round++) {
        const kA = 10 + 2 * round;
        const kB = 10 + 2 * round + 1;
        if (s[kA] === '1') goalsA++;
        if (s[kB] === '1') goalsB++;
        if (goalsA > goalsB) {
          out.push('TEAM-A ' + (kB + 1));
          decided = true;
          break;
        }
        if (goalsB > goalsA) {
          out.push('TEAM-B ' + (kB + 1));
          decided = true;
          break;
        }
      }
    }
    if (!decided) out.push('TIE');
  }
  console.log(out.join('\n'));
}
solve();