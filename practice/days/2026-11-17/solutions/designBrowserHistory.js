var BrowserHistory = function(homepage) {
  this.history = [homepage];
  this.cur = 0;
  this.maxValid = 0;
};

BrowserHistory.prototype.visit = function(url) {
  this.cur++;
  this.history[this.cur] = url;
  this.maxValid = this.cur;
};

BrowserHistory.prototype.back = function(steps) {
  this.cur = Math.max(0, this.cur - steps);
  return this.history[this.cur];
};

BrowserHistory.prototype.forward = function(steps) {
  this.cur = Math.min(this.maxValid, this.cur + steps);
  return this.history[this.cur];
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const a = args[i];
    if (cmd === 'BrowserHistory') {
      obj = new BrowserHistory(...a);
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
