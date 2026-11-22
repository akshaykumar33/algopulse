var Robot = function(width, height) {
  this.w = width;
  this.h = height;
  this.perimeter = 2 * (width + height) - 4;
  this.pos = 0;
  this.moved = false;
};
Robot.prototype.step = function(num) {
  this.moved = true;
  this.pos = (this.pos + num) % this.perimeter;
};
Robot.prototype.getPos = function() {
  const p = this.pos, w = this.w, h = this.h;
  if (p < w) return [p, 0];
  if (p < w + h - 1) return [w - 1, p - (w - 1)];
  if (p < 2 * w + h - 2) return [w - 1 - (p - (w + h - 2)), h - 1];
  return [0, h - 1 - (p - (2 * w + h - 3))];
};
Robot.prototype.getDir = function() {
  if (!this.moved) return "East";
  const p = this.pos, w = this.w, h = this.h;
  if (p === 0) return "South";
  if (p < w) return "East";
  if (p < w + h - 1) return "North";
  if (p < 2 * w + h - 2) return "West";
  return "South";
};
var solve = function(ops, vals) {
  let r = null;
  const res = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "Robot") {
      r = new Robot(vals[i][0], vals[i][1]);
      res.push(null);
    } else if (ops[i] === "step") {
      r.step(vals[i][0]);
      res.push(null);
    } else if (ops[i] === "getPos") {
      res.push(r.getPos());
    } else if (ops[i] === "getDir") {
      res.push(r.getDir());
    }
  }
  return res;
};
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
      const ops = JSON.parse(lines[0]);
      const vals = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(ops, vals)));
    }
  } catch (e) {}
}
module.exports = Robot;