var ProductOfNumbers = function() {
  this.pref = [1];
};

ProductOfNumbers.prototype.add = function(num) {
  if (num === 0) {
    this.pref = [1];
  } else {
    this.pref.push(this.pref[this.pref.length - 1] * num);
  }
};

ProductOfNumbers.prototype.getProduct = function(k) {
  const len = this.pref.length;
  if (k >= len) return 0;
  return Math.floor(this.pref[len - 1] / this.pref[len - 1 - k]);
};

var solve = function(commands, args) {
  if (!args && Array.isArray(commands) && commands.length === 2 && Array.isArray(commands[0])) {
    args = commands[1];
    commands = commands[0];
  }
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const a = args[i];
    if (cmd === 'ProductOfNumbers') {
      obj = new ProductOfNumbers();
      res.push(null);
    } else if (cmd === 'add') {
      obj.add(a[0]);
      res.push(null);
    } else if (cmd === 'getProduct') {
      res.push(obj.getProduct(a[0]));
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
  } catch (err) {
    console.error(err);
  }
}

module.exports = solve;
