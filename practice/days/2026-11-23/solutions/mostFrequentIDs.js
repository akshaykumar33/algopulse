var mostFrequentIDs = function(nums, freq) {
  const n = nums.length;
  const map = new Map();
  const heap = [];
  function push(item) {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] < heap[i][0]) {
        const tmp = heap[p]; heap[p] = heap[i]; heap[i] = tmp;
        i = p;
      } else break;
    }
  }
  function pop() {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      while ((i << 1) + 1 < heap.length) {
        let left = (i << 1) + 1, right = left + 1, best = left;
        if (right < heap.length && heap[right][0] > heap[left][0]) best = right;
        if (heap[best][0] > heap[i][0]) {
          const tmp = heap[best]; heap[best] = heap[i]; heap[i] = tmp;
          i = best;
        } else break;
      }
    }
    return top;
  }
  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    const id = nums[i], change = freq[i];
    const newCount = (map.get(id) || 0) + change;
    map.set(id, newCount);
    push([newCount, id]);
    while (heap.length > 0 && map.get(heap[0][1]) !== heap[0][0]) {
      pop();
    }
    ans[i] = heap.length > 0 ? heap[0][0] : 0;
  }
  return ans;
};
var solve = mostFrequentIDs;
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
module.exports = mostFrequentIDs;
