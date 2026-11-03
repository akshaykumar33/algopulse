var Solution = function(radius, x_center, y_center) {
    this.r = radius;
    this.x = x_center;
    this.y = y_center;
};
Solution.prototype.randPoint = function() {
    const theta = Math.random() * 2 * Math.PI;
    const d = Math.sqrt(Math.random()) * this.r;
    return [this.x + d * Math.cos(theta), this.y + d * Math.sin(theta)];
};
var solve = function(commands, args) {
    let sol = null;
    const out = [];
    for (let i = 0; i < commands.length; i++) {
        if (commands[i] === 'Solution') {
            sol = new Solution(args[i][0], args[i][1], args[i][2]);
            out.push(null);
        } else if (commands[i] === 'randPoint') {
            const pt = sol.randPoint();
            const valid = Math.hypot(pt[0] - sol.x, pt[1] - sol.y) <= sol.r + 1e-7;
            out.push(valid ? true : false);
        }
    }
    return out;
};
module.exports = solve;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const [commands, args] = JSON.parse(line);
        const result = solve(commands, args);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
