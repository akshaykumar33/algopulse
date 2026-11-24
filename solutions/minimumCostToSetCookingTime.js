var minCostSetTime = function(startAt, moveCost, pushCost, targetSeconds) {
  function getCost(m, s) {
    if (m < 0 || m > 99 || s < 0 || s > 99) return Infinity;
    const digits = [];
    if (m > 0) {
      digits.push(Math.floor(m / 10));
      digits.push(m % 10);
      digits.push(Math.floor(s / 10));
      digits.push(s % 10);
    } else {
      if (s >= 10) {
        digits.push(Math.floor(s / 10));
        digits.push(s % 10);
      } else {
        digits.push(s);
      }
    }
    let startIdx = 0;
    while (startIdx < digits.length - 1 && digits[startIdx] === 0) startIdx++;
    let cost = 0;
    let cur = startAt;
    for (let i = startIdx; i < digits.length; i++) {
      const d = digits[i];
      if (d !== cur) {
        cost += moveCost;
        cur = d;
      }
      cost += pushCost;
    }
    return cost;
  }
  const m1 = Math.floor(targetSeconds / 60);
  const s1 = targetSeconds % 60;
  let ans = getCost(m1, s1);
  if (m1 > 0 && s1 + 60 <= 99) {
    ans = Math.min(ans, getCost(m1 - 1, s1 + 60));
  }
  return ans;
};
var solve = minCostSetTime;
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
module.exports = minCostSetTime;
