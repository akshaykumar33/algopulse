var minimumTime = function(time, totalTrips) {
  let l = 1n;
  let minT = BigInt(time[0]);
  for (let i = 1; i < time.length; i++) {
    const v = BigInt(time[i]);
    if (v < minT) minT = v;
  }

  let r = minT * BigInt(totalTrips);
  let ans = r;

  while (l <= r) {
    const mid = (l + r) / 2n;
    let trips = 0n;
    for (let i = 0; i < time.length; i++) {
      trips += mid / BigInt(time[i]);
    }
    if (trips >= BigInt(totalTrips)) {
      ans = mid;
      r = mid - 1n;
    } else {
      l = mid + 1n;
    }
  }

  return Number(ans);
};

var solve = minimumTime;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}
