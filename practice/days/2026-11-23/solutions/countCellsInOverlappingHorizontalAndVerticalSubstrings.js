var countCells = function(grid, pattern) {
  const m = grid.length, n = grid[0].length;
  const total = m * n;
  const P = pattern.length;
  if (P > total) return 0;
  function computeKmp(s) {
    const pi = new Int32Array(s.length);
    for (let i = 1; i < s.length; i++) {
      let j = pi[i - 1];
      while (j > 0 && s[i] !== s[j]) j = pi[j - 1];
      if (s[i] === s[j]) j++;
      pi[i] = j;
    }
    return pi;
  }
  const pi = computeKmp(pattern);
  function findMatches(text) {
    const diff = new Int32Array(total + 1);
    let j = 0;
    for (let i = 0; i < total; i++) {
      while (j > 0 && text[i] !== pattern[j]) j = pi[j - 1];
      if (text[i] === pattern[j]) j++;
      if (j === P) {
        diff[i - P + 1]++;
        diff[i + 1]--;
        j = pi[j - 1];
      }
    }
    const covered = new Uint8Array(total);
    let cur = 0;
    for (let i = 0; i < total; i++) {
      cur += diff[i];
      if (cur > 0) covered[i] = 1;
    }
    return covered;
  }
  const hText = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) hText.push(grid[r][c]);
  }
  const hCov = findMatches(hText);
  const vText = [];
  for (let c = 0; c < n; c++) {
    for (let r = 0; r < m; r++) vText.push(grid[r][c]);
  }
  const vCov = findMatches(vText);
  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const hIdx = r * n + c;
      const vIdx = c * m + r;
      if (hCov[hIdx] && vCov[vIdx]) ans++;
    }
  }
  return ans;
};
var solve = countCells;
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
module.exports = countCells;
