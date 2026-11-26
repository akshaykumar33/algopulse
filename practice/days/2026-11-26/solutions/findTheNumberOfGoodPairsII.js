var numberOfPairs = function(nums1, nums2, k) {
  let maxVal = 0;
  for (let i = 0; i < nums1.length; i++) {
    const x = nums1[i];
    if (x % k === 0) {
      const v = x / k;
      if (v > maxVal) maxVal = v;
    }
  }
  if (maxVal === 0) return 0;
  const freq = new Int32Array(maxVal + 1);
  for (let i = 0; i < nums1.length; i++) {
    const x = nums1[i];
    if (x % k === 0) {
      freq[x / k]++;
    }
  }
  const freq2 = new Map();
  for (let i = 0; i < nums2.length; i++) {
    const y = nums2[i];
    freq2.set(y, (freq2.get(y) || 0) + 1);
  }
  let ans = 0;
  for (const [y, count] of freq2) {
    if (y > maxVal) continue;
    let sum = 0;
    for (let m = y; m <= maxVal; m += y) {
      sum += freq[m];
    }
    ans += sum * count;
  }
  return ans;
};
var solve = numberOfPairs;
if (require.main === module) {
  const fs = require('fs');
  function parseArgs(raw) {
    raw = raw.trim();
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
        const quote = raw[i], start = i;
        i++;
        while (i < raw.length) {
          if (raw[i] === '\\') i += 2;
          else if (raw[i] === quote) { i++; break; }
          else i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else {
        const start = i;
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
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = numberOfPairs(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = numberOfPairs;
