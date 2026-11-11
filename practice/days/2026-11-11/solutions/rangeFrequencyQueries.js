var RangeFreqQuery = function(arr) {
  this.pos = new Map();
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    let list = this.pos.get(v);
    if (!list) {
      list = [];
      this.pos.set(v, list);
    }
    list.push(i);
  }
};

RangeFreqQuery.prototype.query = function(left, right, value) {
  const list = this.pos.get(value);
  if (!list) return 0;

  let lo = 0;
  let hi = list.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (list[mid] < left) lo = mid + 1;
    else hi = mid;
  }
  const start = lo;

  lo = start;
  hi = list.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (list[mid] <= right) lo = mid + 1;
    else hi = mid;
  }
  return lo - start;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const cmds = JSON.parse(lines[i]);
      const args = JSON.parse(lines[i + 1]);
      let obj = null;
      const out = [];
      for (let j = 0; j < cmds.length; j++) {
        const cmd = cmds[j];
        const a = args[j];
        if (cmd === 'RangeFreqQuery') {
          obj = new RangeFreqQuery(...a);
          out.push(null);
        } else {
          const res = obj[cmd](...a);
          out.push(res === undefined ? null : res);
        }
      }
      console.log(JSON.stringify(out));
    }
  }
}
