var numRescueBoats = function(people, limit) {
    people.sort((a, b) => a - b);
    let l = 0, r = people.length - 1;
    let ans = 0;
    while (l <= r) {
        if (people[l] + people[r] <= limit) {
            l++;
        }
        r--;
        ans++;
    }
    return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const parsed1 = JSON.parse(lines[i]);
        const parsed2 = JSON.parse(lines[i + 1]);
        const result = numRescueBoats(parsed1, parsed2);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = numRescueBoats;
