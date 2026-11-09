var ThroneInheritance = function(kingName) {
  this.king = kingName;
  this.children = new Map();
  this.dead = new Set();
};

ThroneInheritance.prototype.birth = function(parentName, childName) {
  if (!this.children.has(parentName)) {
    this.children.set(parentName, []);
  }
  this.children.get(parentName).push(childName);
};

ThroneInheritance.prototype.death = function(name) {
  this.dead.add(name);
};

ThroneInheritance.prototype.getInheritanceOrder = function() {
  const ans = [];
  const dfs = (u) => {
    if (!this.dead.has(u)) {
      ans.push(u);
    }
    const kids = this.children.get(u);
    if (kids) {
      for (let i = 0; i < kids.length; i++) {
        dfs(kids[i]);
      }
    }
  };
  dfs(this.king);
  return ans;
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'ThroneInheritance') {
      obj = new ThroneInheritance(...arg);
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
