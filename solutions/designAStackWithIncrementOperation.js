var CustomStack = function(maxSize) {
  this.maxSize = maxSize;
  this.stack = [];
  this.inc = [];
};

CustomStack.prototype.push = function(x) {
  if (this.stack.length < this.maxSize) {
    this.stack.push(x);
    this.inc.push(0);
  }
};

CustomStack.prototype.pop = function() {
  const idx = this.stack.length - 1;
  if (idx < 0) return -1;

  if (idx > 0) {
    this.inc[idx - 1] += this.inc[idx];
  }
  const res = this.stack.pop() + this.inc.pop();
  return res;
};

CustomStack.prototype.increment = function(k, val) {
  const idx = Math.min(k, this.stack.length) - 1;
  if (idx >= 0) {
    this.inc[idx] += val;
  }
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const a = args[i];
    if (cmd === 'CustomStack') {
      obj = new CustomStack(...a);
      res.push(null);
    } else {
      const r = obj[cmd](...a);
      res.push(r !== undefined ? r : null);
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 2 && Array.isArray(parsed[0])) {
        console.log(JSON.stringify(solve(parsed[0], parsed[1])));
      }
    }
  } catch (e) {}
}
