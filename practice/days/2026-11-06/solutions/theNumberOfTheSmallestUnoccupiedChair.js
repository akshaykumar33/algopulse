var smallestChair = function(times, targetFriend) {
  const n = times.length;
  const events = [];

  for (let i = 0; i < n; i++) {
    events.push({ time: times[i][0], type: 1, friend: i });
    events.push({ time: times[i][1], type: 0, friend: i });
  }

  events.sort((a, b) => {
    if (a.time !== b.time) return a.time - b.time;
    return a.type - b.type;
  });

  const chairOf = new Int32Array(n).fill(-1);
  const freeChairs = [];
  let nextChair = 0;

  function pushChair(c) {
    freeChairs.push(c);
    let idx = freeChairs.length - 1;
    while (idx > 0) {
      const p = (idx - 1) >> 1;
      if (freeChairs[idx] < freeChairs[p]) {
        const tmp = freeChairs[idx];
        freeChairs[idx] = freeChairs[p];
        freeChairs[p] = tmp;
        idx = p;
      } else break;
    }
  }

  function popChair() {
    const top = freeChairs[0];
    const last = freeChairs.pop();
    if (freeChairs.length > 0) {
      freeChairs[0] = last;
      let idx = 0;
      while (true) {
        let sm = idx;
        const l = 2 * idx + 1;
        const r = 2 * idx + 2;
        if (l < freeChairs.length && freeChairs[l] < freeChairs[sm]) sm = l;
        if (r < freeChairs.length && freeChairs[r] < freeChairs[sm]) sm = r;
        if (sm !== idx) {
          const tmp = freeChairs[idx];
          freeChairs[idx] = freeChairs[sm];
          freeChairs[sm] = tmp;
          idx = sm;
        } else break;
      }
    }
    return top;
  }

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    if (e.type === 0) {
      pushChair(chairOf[e.friend]);
    } else {
      let seat;
      if (freeChairs.length > 0) {
        seat = popChair();
      } else {
        seat = nextChair++;
      }
      chairOf[e.friend] = seat;
      if (e.friend === targetFriend) {
        return seat;
      }
    }
  }

  return 0;
};

var solve = typeof smallestChair !== 'undefined' ? smallestChair : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const times = JSON.parse(lines[i]);
        const targetFriend = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(times, targetFriend)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

