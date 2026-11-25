var maxArea = function(coords) {
  const n = coords.length;
  if (n < 3) return -1;
  let minGx = Infinity, maxGx = -Infinity;
  let minGy = Infinity, maxGy = -Infinity;
  const minY = new Map();
  const maxY = new Map();
  const minX = new Map();
  const maxX = new Map();
  for (let i = 0; i < n; i++) {
    const x = coords[i][0];
    const y = coords[i][1];
    if (x < minGx) minGx = x;
    if (x > maxGx) maxGx = x;
    if (y < minGy) minGy = y;
    if (y > maxGy) maxGy = y;
    const pMinY = minY.get(x);
    if (pMinY === undefined || y < pMinY) minY.set(x, y);
    const pMaxY = maxY.get(x);
    if (pMaxY === undefined || y > pMaxY) maxY.set(x, y);
    const pMinX = minX.get(y);
    if (pMinX === undefined || x < pMinX) minX.set(y, x);
    const pMaxX = maxX.get(y);
    if (pMaxX === undefined || x > pMaxX) maxX.set(y, x);
  }
  let ans = 0;
  for (const [x, lo] of minY) {
    const hi = maxY.get(x);
    if (hi > lo) {
      const h = maxGx - x > x - minGx ? maxGx - x : x - minGx;
      const area = (hi - lo) * h;
      if (area > ans) ans = area;
    }
  }
  for (const [y, lo] of minX) {
    const hi = maxX.get(y);
    if (hi > lo) {
      const h = maxGy - y > y - minGy ? maxGy - y : y - minGy;
      const area = (hi - lo) * h;
      if (area > ans) ans = area;
    }
  }
  return ans === 0 ? -1 : ans;
};
var solve = maxArea;
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
    if (args.length === 1 && Array.isArray(args[0]) && maxArea.length > 1 && args[0].length === maxArea.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = maxArea(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = maxArea;
