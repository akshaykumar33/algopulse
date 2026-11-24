var maxScore = function(nums1, nums2, k) {
  const n = nums1.length;
  const pairs = [];
  for (let i = 0; i < n; i++) {
    pairs.push([nums2[i], nums1[i]]);
  }
  pairs.sort((a, b) => b[0] - a[0]);
  class MinHeap {
    constructor() { this.data = []; }
    push(val) {
      this.data.push(val);
      this._up(this.data.length - 1);
    }
    pop() {
      const top = this.data[0];
      const bottom = this.data.pop();
      if (this.data.length > 0) {
        this.data[0] = bottom;
        this._down(0);
      }
      return top;
    }
    size() { return this.data.length; }
    _up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.data[p] > this.data[i]) {
          const t = this.data[p]; this.data[p] = this.data[i]; this.data[i] = t;
          i = p;
        } else break;
      }
    }
    _down(i) {
      const len = this.data.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1, right = left + 1, best = left;
        if (right < len && this.data[right] < this.data[left]) best = right;
        if (this.data[best] < this.data[i]) {
          const t = this.data[best]; this.data[best] = this.data[i]; this.data[i] = t;
          i = best;
        } else break;
      }
    }
  }
  const heap = new MinHeap();
  let sum = 0;
  let ans = 0;
  for (const [v2, v1] of pairs) {
    heap.push(v1);
    sum += v1;
    if (heap.size() > k) {
      sum -= heap.pop();
    }
    if (heap.size() === k) {
      const cur = sum * v2;
      if (cur > ans) ans = cur;
    }
  }
  return ans;
};
var solve = maxScore;
if (require.main === module) {
  const fs = require('fs');
  function parseArgs(raw) {
    raw = raw.trim();
    try {
      const p = JSON.parse(raw);
      if (Array.isArray(p) && solve.length > 1 && !raw.startsWith('[[')) return p;
    } catch (e) {}
    const args = [];
    let i = 0;
    while (i < raw.length) {
      while (i < raw.length && /\s/.test(raw[i])) i++;
      if (i >= raw.length) break;
      if (raw[i] === '[' || raw[i] === '{') {
        let depth = 0, start = i, inStr = false, quote = '';
        while (i < raw.length) {
          const c = raw[i];
          if (inStr) {
            if (c === '\\') i++;
            else if (c === quote) inStr = false;
          } else {
            if (c === '"' || c === "'") { inStr = true; quote = c; }
            else if (c === '[' || c === '{') depth++;
            else if (c === ']' || c === '}') {
              depth--;
              if (depth === 0) { i++; break; }
            }
          }
          i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else if (raw[i] === '"' || raw[i] === "'") {
        let quote = raw[i], start = i; i++;
        while (i < raw.length) {
          if (raw[i] === '\\') i += 2;
          else if (raw[i] === quote) { i++; break; }
          else i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else {
        let start = i;
        while (i < raw.length && !/\s/.test(raw[i])) i++;
        const tok = raw.slice(start, i);
        if (tok === 'true') args.push(true);
        else if (tok === 'false') args.push(false);
        else if (tok === 'null') args.push(null);
        else if (!isNaN(Number(tok))) args.push(Number(tok));
        else args.push(tok);
      }
    }
    return args;
  }
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = parseArgs(raw);
      const res = solve(...parsed);
      console.log(JSON.stringify(res));
    }
  } catch (e) {}
}
module.exports = maxScore;
