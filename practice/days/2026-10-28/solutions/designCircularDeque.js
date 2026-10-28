var MyCircularDeque = function(k) {
  this.capacity = k + 1;
  this.buffer = new Int32Array(this.capacity);
  this.front = 0;
  this.rear = 0;
};

MyCircularDeque.prototype.insertFront = function(value) {
  if (this.isFull()) return false;
  this.front = (this.front - 1 + this.capacity) % this.capacity;
  this.buffer[this.front] = value;
  return true;
};

MyCircularDeque.prototype.insertLast = function(value) {
  if (this.isFull()) return false;
  this.buffer[this.rear] = value;
  this.rear = (this.rear + 1) % this.capacity;
  return true;
};

MyCircularDeque.prototype.deleteFront = function() {
  if (this.isEmpty()) return false;
  this.front = (this.front + 1) % this.capacity;
  return true;
};

MyCircularDeque.prototype.deleteLast = function() {
  if (this.isEmpty()) return false;
  this.rear = (this.rear - 1 + this.capacity) % this.capacity;
  return true;
};

MyCircularDeque.prototype.getFront = function() {
  if (this.isEmpty()) return -1;
  return this.buffer[this.front];
};

MyCircularDeque.prototype.getRear = function() {
  if (this.isEmpty()) return -1;
  return this.buffer[(this.rear - 1 + this.capacity) % this.capacity];
};

MyCircularDeque.prototype.isEmpty = function() {
  return this.front === this.rear;
};

MyCircularDeque.prototype.isFull = function() {
  return (this.rear + 1) % this.capacity === this.front;
};

var solve = function(commands, args) {
  let deque = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'MyCircularDeque') {
      deque = new MyCircularDeque(arg[0]);
      res.push(null);
    } else if (cmd === 'insertLast') {
      res.push(deque.insertLast(arg[0]));
    } else if (cmd === 'insertFront') {
      res.push(deque.insertFront(arg[0]));
    } else if (cmd === 'deleteLast') {
      res.push(deque.deleteLast());
    } else if (cmd === 'deleteFront') {
      res.push(deque.deleteFront());
    } else if (cmd === 'getFront') {
      res.push(deque.getFront());
    } else if (cmd === 'getRear') {
      res.push(deque.getRear());
    } else if (cmd === 'isEmpty') {
      res.push(deque.isEmpty());
    } else if (cmd === 'isFull') {
      res.push(deque.isFull());
    }
  }
  return res;
};

// ---------------- LOCAL TEST HARNESS ----------------
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
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

