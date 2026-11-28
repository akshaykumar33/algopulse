var Allocator = function(n) {
  this.mem = new Int32Array(n);
  this.n = n;
};
Allocator.prototype.allocate = function(size, mID) {
  let cnt = 0;
  for (let i = 0; i < this.n; i++) {
    if (this.mem[i] === 0) {
      cnt++;
      if (cnt === size) {
        const st = i - size + 1;
        for (let j = st; j <= i; j++) this.mem[j] = mID;
        return st;
      }
    } else cnt = 0;
  }
  return -1;
};
Allocator.prototype.freeMemory = function(mID) {
  let cnt = 0;
  for (let i = 0; i < this.n; i++) if (this.mem[i] === mID) { this.mem[i] = 0; cnt++; }
  return cnt;
};
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const [ops, args] = raw.split(/\r?\n/).filter(Boolean).map(l => JSON.parse(l));
    let obj = null;
    const res = [];
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === 'Allocator') { obj = new Allocator(...args[i]); res.push(null); }
      else res.push(obj[ops[i]](...args[i]));
    }
    console.log(JSON.stringify(res));
  }
}
module.exports = Allocator;
