var Solution = function(rects) {
  this.rects = rects;
  this.prefix = [];
  let total = 0;
  for (const [x1, y1, x2, y2] of rects) {
    total += (x2 - x1 + 1) * (y2 - y1 + 1);
    this.prefix.push(total);
  }
  this.total = total;
};

Solution.prototype.pick = function() {
  const target = Math.floor(Math.random() * this.total) + 1;
  let lo = 0, hi = this.prefix.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (this.prefix[mid] >= target) hi = mid;
    else lo = mid + 1;
  }
  const [x1, y1, x2, y2] = this.rects[lo];
  const width = x2 - x1 + 1;
  const offset = target - (lo > 0 ? this.prefix[lo - 1] : 0) - 1;
  const x = x1 + (offset % width);
  const y = y1 + Math.floor(offset / width);
  return [x, y];
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'Solution') {
      obj = new Solution(arg[0]);
      res.push(null);
    } else if (cmd === 'pick') {
      res.push(obj.pick());
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

