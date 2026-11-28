var StockSpanner = function() {
  this.p = [];
  this.c = [];
};
StockSpanner.prototype.next = function(price) {
  let ans = 1;
  while (this.p.length && this.p[this.p.length - 1] <= price) {
    this.p.pop();
    ans += this.c.pop();
  }
  this.p.push(price);
  this.c.push(ans);
  return ans;
};
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const [ops, args] = raw.split(/\r?\n/).filter(Boolean).map(l => JSON.parse(l));
    let obj = null;
    const res = [];
    for (let i = 0; i < ops.length; i++) {
      if (i === 0) { obj = new StockSpanner(...args[0]); res.push(null); }
      else { const v = obj[ops[i]](...args[i]); res.push(v === undefined ? null : v); }
    }
    console.log(JSON.stringify(res));
  }
}
module.exports = StockSpanner;
