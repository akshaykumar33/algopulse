var numberOfRounds = function(loginTime, logoutTime) {
  const t1Arr = loginTime.split(':');
  const t2Arr = logoutTime.split(':');
  const h1 = Number(t1Arr[0]);
  const m1 = Number(t1Arr[1]);
  const h2 = Number(t2Arr[0]);
  const m2 = Number(t2Arr[1]);

  let t1 = h1 * 60 + m1;
  let t2 = h2 * 60 + m2;
  if (t2 < t1) t2 += 1440;

  const first = Math.ceil(t1 / 15) * 15;
  const last = Math.floor(t2 / 15) * 15;

  if (first > last) return 0;
  return Math.floor((last - first) / 15);
};

var solve = numberOfRounds;

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

module.exports = numberOfRounds;
