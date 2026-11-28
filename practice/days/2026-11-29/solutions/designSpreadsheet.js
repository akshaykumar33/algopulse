var Spreadsheet = function(rows) {
  this.mp = new Map();
};
Spreadsheet.prototype.setCell = function(cell, value) {
  this.mp.set(cell, value);
};
Spreadsheet.prototype.resetCell = function(cell) {
  this.mp.delete(cell);
};
Spreadsheet.prototype.getValue = function(formula) {
  const [x, y] = formula.slice(1).split('+');
  const val = t => (t[0] >= 'A' && t[0] <= 'Z') ? (this.mp.get(t) || 0) : +t;
  return val(x) + val(y);
};
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const [ops, args] = raw.split(/\r?\n/).filter(Boolean).map(l => JSON.parse(l));
    let obj = null;
    const res = [];
    for (let i = 0; i < ops.length; i++) {
      if (i === 0) { obj = new Spreadsheet(...args[0]); res.push(null); }
      else { const v = obj[ops[i]](...args[i]); res.push(v === undefined ? null : v); }
    }
    console.log(JSON.stringify(res));
  }
}
module.exports = Spreadsheet;
