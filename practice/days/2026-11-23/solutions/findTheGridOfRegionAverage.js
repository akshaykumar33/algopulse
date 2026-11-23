var resultGrid = function(image, threshold) {
  const m = image.length, n = image[0].length;
  const sumVal = Array.from({ length: m }, () => new Int32Array(n));
  const countVal = Array.from({ length: m }, () => new Int32Array(n));
  for (let r = 0; r <= m - 3; r++) {
    for (let c = 0; c <= n - 3; c++) {
      let valid = true, sum = 0;
      for (let i = r; i < r + 3; i++) {
        for (let j = c; j < c + 3; j++) {
          sum += image[i][j];
          if (i + 1 < r + 3 && Math.abs(image[i][j] - image[i + 1][j]) > threshold) valid = false;
          if (j + 1 < c + 3 && Math.abs(image[i][j] - image[i][j + 1]) > threshold) valid = false;
        }
      }
      if (valid) {
        const avg = Math.floor(sum / 9);
        for (let i = r; i < r + 3; i++) {
          for (let j = c; j < c + 3; j++) {
            sumVal[i][j] += avg;
            countVal[i][j]++;
          }
        }
      }
    }
  }
  const res = Array.from({ length: m }, () => new Array(n));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[i][j] = countVal[i][j] > 0 ? Math.floor(sumVal[i][j] / countVal[i][j]) : image[i][j];
    }
  }
  return res;
};
var solve = resultGrid;
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
module.exports = resultGrid;
