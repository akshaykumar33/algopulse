var TopVotedCandidate = function(persons, times) {
  this.times = times;
  this.leaders = new Int32Array(times.length);
  const count = new Int32Array(persons.length + 1);
  let leader = -1;
  let maxVotes = 0;

  for (let i = 0; i < times.length; i++) {
    const p = persons[i];
    count[p]++;
    if (count[p] >= maxVotes) {
      maxVotes = count[p];
      leader = p;
    }
    this.leaders[i] = leader;
  }
};

TopVotedCandidate.prototype.q = function(t) {
  let l = 0;
  let r = this.times.length - 1;
  let ans = 0;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (this.times[mid] <= t) {
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return this.leaders[ans];
};

var solve = function(persons, times, queries) {
  const obj = new TopVotedCandidate(persons, times);
  return queries.map(t => obj.q(t));
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
