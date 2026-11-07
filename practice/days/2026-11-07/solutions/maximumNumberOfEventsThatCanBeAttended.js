class EventMinHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      const tmp = this.h[p];
      this.h[p] = this.h[i];
      this.h[i] = tmp;
      i = p;
    }
  }
  pop() {
    const top = this.h[0];
    const end = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = end;
      let i = 0;
      const len = this.h.length;
      while (true) {
        let l = (i << 1) + 1;
        let r = l + 1;
        let s = i;
        if (l < len && this.h[l] < this.h[s]) s = l;
        if (r < len && this.h[r] < this.h[s]) s = r;
        if (s === i) break;
        const tmp = this.h[i];
        this.h[i] = this.h[s];
        this.h[s] = tmp;
        i = s;
      }
    }
    return top;
  }
  peek() {
    return this.h[0];
  }
  get size() {
    return this.h.length;
  }
}

var maxEvents = function(events) {
  events.sort((a, b) => a[0] - b[0]);
  const pq = new EventMinHeap();
  let i = 0, ans = 0, n = events.length, day = 0;
  while (i < n || pq.size > 0) {
    if (pq.size === 0) {
      day = events[i][0];
    }
    while (i < n && events[i][0] <= day) {
      pq.push(events[i][1]);
      i++;
    }
    while (pq.size > 0 && pq.peek() < day) {
      pq.pop();
    }
    if (pq.size > 0) {
      pq.pop();
      ans++;
      day++;
    }
  }
  return ans;
};

var solve = maxEvents;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}
module.exports = solve;
