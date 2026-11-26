var minimumOperationsToMakeEqual = function(x, y) {
  if (x <= y) return y - x;
  const maxV = x + 15;
  const dist = new Int32Array(maxV + 1).fill(-1);
  const q = new Int32Array(maxV + 1);
  let head = 0, tail = 0;
  dist[x] = 0;
  q[tail++] = x;
  let ans = x - y;
  while (head < tail) {
    const cur = q[head++];
    const d = dist[cur];
    if (d >= ans) continue;
    if (cur <= y) {
      const cand = d + (y - cur);
      if (cand < ans) ans = cand;
      continue;
    }
    if (cur % 11 === 0) {
      const nxt = cur / 11;
      if (dist[nxt] === -1) {
        dist[nxt] = d + 1;
        q[tail++] = nxt;
      }
    }
    if (cur % 5 === 0) {
      const nxt = cur / 5;
      if (dist[nxt] === -1) {
        dist[nxt] = d + 1;
        q[tail++] = nxt;
      }
    }
    if (cur - 1 >= 0 && dist[cur - 1] === -1) {
      dist[cur - 1] = d + 1;
      q[tail++] = cur - 1;
    }
    if (cur + 1 <= maxV && dist[cur + 1] === -1) {
      dist[cur + 1] = d + 1;
      q[tail++] = cur + 1;
    }
  }
  return ans;
};
var solve = minimumOperationsToMakeEqual;
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
    if (args.length === 1 && Array.isArray(args[0]) && minimumOperationsToMakeEqual.length > 1 && args[0].length === minimumOperationsToMakeEqual.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = minimumOperationsToMakeEqual(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minimumOperationsToMakeEqual;
