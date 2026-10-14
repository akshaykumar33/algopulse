var ParkingSystem = function(big, medium, small) {
  this.cnt = [0, big, medium, small];
};

ParkingSystem.prototype.addCar = function(carType) {
  if (this.cnt[carType] > 0) {
    this.cnt[carType]--;
    return true;
  }
  return false;
};

var solve = function(actions, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === "ParkingSystem") {
      obj = new ParkingSystem(...args[i]);
      res.push(null);
    } else {
      res.push(obj.addCar(...args[i]));
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
      if (lines.length === 2) {
        const actions = JSON.parse(lines[0]);
        const args = JSON.parse(lines[1]);
        const result = solve(actions, args);
        console.log(JSON.stringify(result));
      } else {
        for (const line of lines) {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
