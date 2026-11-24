var mostFrequentPrime = function(mat) {
  const m = mat.length;
  const n = mat[0].length;
  function isPrime(val) {
    if (val < 2) return false;
    for (let d = 2; d * d <= val; d++) {
      if (val % d === 0) return false;
    }
    return true;
  }
  const count = new Map();
  const dirs = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      for (const [dr, dc] of dirs) {
        let cr = r, cc = c, val = 0;
        while (cr >= 0 && cr < m && cc >= 0 && cc < n) {
          val = val * 10 + mat[cr][cc];
          if (val > 10 && isPrime(val)) {
            count.set(val, (count.get(val) || 0) + 1);
          }
          cr += dr;
          cc += dc;
        }
      }
    }
  }
  let maxFreq = 0;
  let bestPrime = -1;
  for (const [p, freq] of count.entries()) {
    if (freq > maxFreq || (freq === maxFreq && p > bestPrime)) {
      maxFreq = freq;
      bestPrime = p;
    }
  }
  return bestPrime;
};
var solve = mostFrequentPrime;
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
module.exports = mostFrequentPrime;
