var FindSumPairs = function(nums1, nums2) {
  this.nums2 = nums2.slice();
  this.freq1 = new Map();
  for (let i = 0; i < nums1.length; i++) {
    const v = nums1[i];
    this.freq1.set(v, (this.freq1.get(v) || 0) + 1);
  }
  this.freq2 = new Map();
  for (let i = 0; i < nums2.length; i++) {
    const v = nums2[i];
    this.freq2.set(v, (this.freq2.get(v) || 0) + 1);
  }
};

FindSumPairs.prototype.add = function(index, val) {
  const old = this.nums2[index];
  const nxt = old + val;
  this.nums2[index] = nxt;
  const c = this.freq2.get(old);
  if (c === 1) this.freq2.delete(old);
  else this.freq2.set(old, c - 1);
  this.freq2.set(nxt, (this.freq2.get(nxt) || 0) + 1);
};

FindSumPairs.prototype.count = function(tot) {
  let ans = 0;
  for (const [x, cx] of this.freq1) {
    const cy = this.freq2.get(tot - x);
    if (cy !== undefined) ans += cx * cy;
  }
  return ans;
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
        if (cmd === 'FindSumPairs') {
          obj = new FindSumPairs(...a);
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
