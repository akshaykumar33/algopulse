class MyCircularQueue {
    constructor(k) {
        this.capacity = k + 1;
        this.queue = new Array(this.capacity);
        this.head = 0;
        this.tail = 0;
    }

    enQueue(value) {
        if (this.isFull()) {
            return false;
        }
        this.queue[this.tail] = value;
        this.tail = (this.tail + 1) % this.capacity;
        return true;
    }

    deQueue() {
        if (this.isEmpty()) {
            return false;
        }
        this.head = (this.head + 1) % this.capacity;
        return true;
    }

    Front() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.queue[this.head];
    }

    Rear() {
        if (this.isEmpty()) {
            return -1;
        }
        const idx = (this.tail - 1 + this.capacity) % this.capacity;
        return this.queue[idx];
    }

    isEmpty() {
        return this.head === this.tail;
    }

    isFull() {
        return (this.tail + 1) % this.capacity === this.head;
    }
}

function solve(operations, operands) {
    let obj = null;
    let res = [];
    for (let i = 0; i < operations.length; i++) {
        if (operations[i] === "MyCircularQueue") {
            obj = new MyCircularQueue(operands[i][0]);
            res.push(null);
        } else if (operations[i] === "enQueue") {
            res.push(obj.enQueue(operands[i][0]));
        } else if (operations[i] === "deQueue") {
            res.push(obj.deQueue());
        } else if (operations[i] === "Front") {
            res.push(obj.Front());
        } else if (operations[i] === "Rear") {
            res.push(obj.Rear());
        } else if (operations[i] === "isEmpty") {
            res.push(obj.isEmpty());
        } else if (operations[i] === "isFull") {
            res.push(obj.isFull());
        }
    }
    return res;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let ops = JSON.parse(lines[0]);
      let vals = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(ops, vals)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
