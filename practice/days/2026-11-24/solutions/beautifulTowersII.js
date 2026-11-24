var maximumSumOfHeights = function(maxHeights) {
  const n = maxHeights.length;
  const left = new Array(n).fill(0);
  const right = new Array(n).fill(0);
  let stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && maxHeights[stack[stack.length - 1]] >= maxHeights[i]) {
      stack.pop();
    }
    if (stack.length === 0) {
      left[i] = (i + 1) * maxHeights[i];
    } else {
      const prev = stack[stack.length - 1];
      left[i] = left[prev] + (i - prev) * maxHeights[i];
    }
    stack.push(i);
  }
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && maxHeights[stack[stack.length - 1]] >= maxHeights[i]) {
      stack.pop();
    }
    if (stack.length === 0) {
      right[i] = (n - i) * maxHeights[i];
    } else {
      const next = stack[stack.length - 1];
      right[i] = right[next] + (next - i) * maxHeights[i];
    }
    stack.push(i);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const cur = left[i] + right[i] - maxHeights[i];
    if (cur > ans) ans = cur;
  }
  return ans;
};
var solve = maximumSumOfHeights;
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
module.exports = maximumSumOfHeights;
