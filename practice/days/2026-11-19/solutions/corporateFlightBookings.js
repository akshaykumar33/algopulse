var corpFlightBookings = function(bookings, n) {
  const diff = new Int32Array(n + 2);
  for (let i = 0; i < bookings.length; i++) {
    const l = bookings[i][0];
    const r = bookings[i][1];
    const seats = bookings[i][2];
    diff[l] += seats;
    diff[r + 1] -= seats;
  }
  const ans = new Array(n);
  let cur = 0;
  for (let i = 1; i <= n; i++) {
    cur += diff[i];
    ans[i - 1] = cur;
  }
  return ans;
};

var solve = corpFlightBookings;

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

module.exports = corpFlightBookings;
