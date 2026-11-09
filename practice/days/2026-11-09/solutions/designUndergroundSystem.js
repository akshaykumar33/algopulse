var UndergroundSystem = function() {
  this.checkIns = new Map();
  this.routes = new Map();
};

UndergroundSystem.prototype.checkIn = function(id, stationName, t) {
  this.checkIns.set(id, [stationName, t]);
};

UndergroundSystem.prototype.checkOut = function(id, stationName, t) {
  const [startStation, startTime] = this.checkIns.get(id);
  this.checkIns.delete(id);
  const key = startStation + '#' + stationName;
  const duration = t - startTime;
  let entry = this.routes.get(key);
  if (!entry) {
    entry = [0, 0];
    this.routes.set(key, entry);
  }
  entry[0] += duration;
  entry[1]++;
};

UndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {
  const key = startStation + '#' + endStation;
  const entry = this.routes.get(key);
  return entry[0] / entry[1];
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'UndergroundSystem') {
      obj = new UndergroundSystem();
      res.push(null);
    } else {
      const val = obj[cmd](...arg);
      res.push(val !== undefined ? val : null);
    }
  }
  return res;
};

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
  } catch (err) {}
}

module.exports = solve;
