var Bitset = function(size) {
  this.size = size;
  this.bits = new Uint8Array(size);
  this.flipped = 0;
  this.ones = 0;
};
Bitset.prototype.fix = function(idx) {
  const actual = this.bits[idx] ^ this.flipped;
  if (actual === 0) {
    this.bits[idx] = 1 ^ this.flipped;
    this.ones++;
  }
};
Bitset.prototype.unfix = function(idx) {
  const actual = this.bits[idx] ^ this.flipped;
  if (actual === 1) {
    this.bits[idx] = 0 ^ this.flipped;
    this.ones--;
  }
};
Bitset.prototype.flip = function() {
  this.flipped ^= 1;
  this.ones = this.size - this.ones;
};
Bitset.prototype.all = function() {
  return this.ones === this.size;
};
Bitset.prototype.one = function() {
  return this.ones > 0;
};
Bitset.prototype.count = function() {
  return this.ones;
};
Bitset.prototype.toString = function() {
  const chars = new Array(this.size);
  for (let i = 0; i < this.size; i++) {
    chars[i] = (this.bits[i] ^ this.flipped) === 1 ? '1' : '0';
  }
  return chars.join('');
};

var solve = function(commands, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'Bitset') {
      obj = new Bitset(...arg);
      res.push(null);
    } else {
      const r = obj[cmd](...arg);
      res.push(r === undefined ? null : r);
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
module.exports = { Bitset, solve };
