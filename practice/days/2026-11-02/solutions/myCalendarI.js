var MyCalendar = function() {
  this.events = [];
};

MyCalendar.prototype.book = function(startTime, endTime) {
  for (const [s, e] of this.events) {
    if (Math.max(s, startTime) < Math.min(e, endTime)) {
      return false;
    }
  }
  this.events.push([startTime, endTime]);
  return true;
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'MyCalendar') {
      obj = new MyCalendar();
      res.push(null);
    } else if (cmd === 'book') {
      res.push(obj.book(arg[0], arg[1]));
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  }
}

