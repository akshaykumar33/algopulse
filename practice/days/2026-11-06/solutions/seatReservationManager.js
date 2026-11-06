var SeatManager = function(n) {
  this.nextSeat = 1;
  this.heap = [];
};

SeatManager.prototype.pushHeap = function(val) {
  this.heap.push(val);
  let idx = this.heap.length - 1;
  while (idx > 0) {
    const parent = (idx - 1) >> 1;
    if (this.heap[idx] < this.heap[parent]) {
      const temp = this.heap[idx];
      this.heap[idx] = this.heap[parent];
      this.heap[parent] = temp;
      idx = parent;
    } else {
      break;
    }
  }
};

SeatManager.prototype.popHeap = function() {
  const top = this.heap[0];
  const last = this.heap.pop();
  if (this.heap.length > 0) {
    this.heap[0] = last;
    let idx = 0;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest !== idx) {
        const temp = this.heap[idx];
        this.heap[idx] = this.heap[smallest];
        this.heap[smallest] = temp;
        idx = smallest;
      } else {
        break;
      }
    }
  }
  return top;
};

SeatManager.prototype.reserve = function() {
  if (this.heap.length > 0) {
    return this.popHeap();
  }
  return this.nextSeat++;
};

SeatManager.prototype.unreserve = function(seatNumber) {
  this.pushHeap(seatNumber);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const commands = JSON.parse(lines[i]);
        const args = JSON.parse(lines[i + 1]);
        let obj = null;
        const res = [];
        for (let j = 0; j < commands.length; j++) {
          if (commands[j] === 'SeatManager') {
            obj = new SeatManager(args[j][0]);
            res.push(null);
          } else if (commands[j] === 'reserve') {
            res.push(obj.reserve());
          } else if (commands[j] === 'unreserve') {
            obj.unreserve(args[j][0]);
            res.push(null);
          }
        }
        console.log(JSON.stringify(res));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = SeatManager;

