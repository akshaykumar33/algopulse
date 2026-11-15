var assignTasks = function(servers, tasks) {
  const numServers = servers.length;
  const numTasks = tasks.length;
  const ans = new Int32Array(numTasks);

  class MinHeap {
    constructor(compare) {
      this.data = [];
      this.compare = compare;
    }
    push(val) {
      this.data.push(val);
      this.up(this.data.length - 1);
    }
    pop() {
      if (this.data.length === 0) return null;
      const top = this.data[0];
      const bot = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = bot;
        this.down(0);
      }
      return top;
    }
    peek() {
      return this.data[0] || null;
    }
    size() {
      return this.data.length;
    }
    up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.compare(this.data[i], this.data[p]) < 0) {
          [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
          i = p;
        } else break;
      }
    }
    down(i) {
      const len = this.data.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let best = i;
        if (this.compare(this.data[left], this.data[best]) < 0) best = left;
        if (right < len && this.compare(this.data[right], this.data[best]) < 0) best = right;
        if (best !== i) {
          [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
          i = best;
        } else break;
      }
    }
  }

  const freeHeap = new MinHeap((a, b) => {
    if (a.weight !== b.weight) return a.weight - b.weight;
    return a.idx - b.idx;
  });

  const busyHeap = new MinHeap((a, b) => {
    if (a.freeTime !== b.freeTime) return a.freeTime - b.freeTime;
    if (a.weight !== b.weight) return a.weight - b.weight;
    return a.idx - b.idx;
  });

  for (let i = 0; i < numServers; i++) {
    freeHeap.push({ weight: servers[i], idx: i });
  }

  let time = 0;
  for (let i = 0; i < numTasks; i++) {
    if (time < i) time = i;
    if (freeHeap.size() === 0 && busyHeap.peek().freeTime > time) {
      time = busyHeap.peek().freeTime;
    }

    while (busyHeap.size() > 0 && busyHeap.peek().freeTime <= time) {
      const server = busyHeap.pop();
      freeHeap.push({ weight: server.weight, idx: server.idx });
    }

    const assigned = freeHeap.pop();
    ans[i] = assigned.idx;
    busyHeap.push({ weight: assigned.weight, idx: assigned.idx, freeTime: time + tasks[i] });
  }

  return Array.from(ans);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(assignTasks(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = assignTasks;
