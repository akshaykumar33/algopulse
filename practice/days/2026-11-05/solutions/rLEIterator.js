var RLEIterator = function(A) {
    this.A = A;
    this.i = 0;
};

RLEIterator.prototype.next = function(n) {
    while (this.i < this.A.length && n > 0) {
        if (this.A[this.i] >= n) {
            this.A[this.i] -= n;
            return this.A[this.i + 1];
        } else {
            n -= this.A[this.i];
            this.i += 2;
        }
    }
    return -1;
};

var solve = RLEIterator;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const ops = JSON.parse(lines[0]);
      const args = JSON.parse(lines[1]);
      let obj = null;
      const res = [];
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "RLEIterator") {
          obj = new solve(args[i][0]);
          res.push(null);
        } else if (ops[i] === "next") {
          res.push(obj.next(args[i][0]));
        }
      }
      console.log(JSON.stringify(res));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
