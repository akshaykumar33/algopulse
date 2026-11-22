var Router = function(memoryLimit) {
  this.limit = memoryLimit;
  this.queue = [];
  this.head = 0;
  this.set = new Set();
  this.destMap = new Map();
};
Router.prototype.addPacket = function(source, destination, timestamp) {
  const key = source + ',' + destination + ',' + timestamp;
  if (this.set.has(key)) return false;
  if (this.queue.length - this.head >= this.limit) {
    const old = this.queue[this.head++];
    this.set.delete(old[0] + ',' + old[1] + ',' + old[2]);
    const list = this.destMap.get(old[1]);
    if (list) list.head++;
  }
  const pkt = [source, destination, timestamp];
  this.queue.push(pkt);
  this.set.add(key);
  if (!this.destMap.has(destination)) {
    this.destMap.set(destination, { items: [], head: 0 });
  }
  this.destMap.get(destination).items.push(timestamp);
  return true;
};
Router.prototype.forwardPacket = function() {
  if (this.queue.length - this.head === 0) return [];
  const pkt = this.queue[this.head++];
  this.set.delete(pkt[0] + ',' + pkt[1] + ',' + pkt[2]);
  const list = this.destMap.get(pkt[1]);
  if (list) list.head++;
  return pkt;
};
Router.prototype.getCount = function(destination, startTime, endTime) {
  const list = this.destMap.get(destination);
  if (!list) return 0;
  const items = list.items;
  const head = list.head;
  const n = items.length;
  if (head >= n) return 0;
  let l = head, r = n - 1, first = -1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (items[mid] >= startTime) {
      first = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  if (first === -1 || items[first] > endTime) return 0;
  l = first; r = n - 1;
  let last = first;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (items[mid] <= endTime) {
      last = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return last - first + 1;
};
var solve = function(ops, vals) {
  let r = null;
  const res = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "Router") {
      r = new Router(vals[i][0]);
      res.push(null);
    } else if (ops[i] === "addPacket") {
      res.push(r.addPacket(vals[i][0], vals[i][1], vals[i][2]));
    } else if (ops[i] === "forwardPacket") {
      res.push(r.forwardPacket());
    } else if (ops[i] === "getCount") {
      res.push(r.getCount(vals[i][0], vals[i][1], vals[i][2]));
    }
  }
  return res;
};
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
      const ops = JSON.parse(lines[0]);
      const vals = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(ops, vals)));
    }
  } catch (e) {}
}
module.exports = Router;