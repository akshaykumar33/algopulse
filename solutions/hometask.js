const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const s = input[ptr++];
  const k = parseInt(input[ptr++], 10);
  let totalDeletions = 0;
  for (let p = 0; p < k; p++) {
    const pair = input[ptr++];
    const c1 = pair[0], c2 = pair[1];
    let cnt1 = 0, cnt2 = 0;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === c1) {
        cnt1++;
      } else if (ch === c2) {
        cnt2++;
      } else {
        totalDeletions += Math.min(cnt1, cnt2);
        cnt1 = 0;
        cnt2 = 0;
      }
    }
    totalDeletions += Math.min(cnt1, cnt2);
  }
  console.log(totalDeletions);
}
solve();