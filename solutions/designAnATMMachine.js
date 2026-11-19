var ATM = function() {
  this.notes = [0, 0, 0, 0, 0];
  this.values = [20, 50, 100, 200, 500];
};

ATM.prototype.deposit = function(banknotesCount) {
  for (let i = 0; i < 5; i++) {
    this.notes[i] += banknotesCount[i];
  }
};

ATM.prototype.withdraw = function(amount) {
  const take = [0, 0, 0, 0, 0];
  let rem = amount;
  for (let i = 4; i >= 0; i--) {
    const val = this.values[i];
    const cnt = Math.min(this.notes[i], Math.floor(rem / val));
    take[i] = cnt;
    rem -= cnt * val;
  }
  if (rem !== 0) {
    return [-1];
  }
  for (let i = 0; i < 5; i++) {
    this.notes[i] -= take[i];
  }
  return take;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    let methods, args;
    const lines = raw.split(/\r?\n/).filter(Boolean);
    if (lines.length >= 2) {
      methods = JSON.parse(lines[0]);
      args = JSON.parse(lines[1]);
    } else {
      const parsed = JSON.parse(raw);
      methods = parsed[0];
      args = parsed[1];
    }
    let obj = null;
    const res = [];
    for (let i = 0; i < methods.length; i++) {
      if (methods[i] === 'ATM') {
        obj = new ATM();
        res.push(null);
      } else if (methods[i] === 'deposit') {
        obj.deposit(args[i][0]);
        res.push(null);
      } else if (methods[i] === 'withdraw') {
        res.push(obj.withdraw(args[i][0]));
      }
    }
    console.log(JSON.stringify(res));
  }
}

module.exports = ATM;
