var sumGame = function(num) {
  const n = num.length;
  let s1 = 0;
  let q1 = 0;
  let s2 = 0;
  let q2 = 0;

  for (let i = 0; i < n / 2; i++) {
    if (num[i] === '?') q1++;
    else s1 += num.charCodeAt(i) - 48;
  }
  for (let i = n / 2; i < n; i++) {
    if (num[i] === '?') q2++;
    else s2 += num.charCodeAt(i) - 48;
  }

  const sDiff = s1 - s2;
  const qDiff = q2 - q1;

  if ((qDiff % 2 !== 0)) return true;
  return sDiff !== Math.floor(qDiff / 2) * 9;
};

var solve = sumGame;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
