var longestBalanced = function(s) {
  const n = s.length;
  let maxLen = 0;
  const freq = new Int32Array(26);
  for (let l = 0; l < n; l++) {
    freq.fill(0);
    let distinct = 0;
    let maxFreq = 0;
    for (let r = l; r < n; r++) {
      const c = s.charCodeAt(r) - 97;
      if (freq[c] === 0) distinct++;
      freq[c]++;
      if (freq[c] > maxFreq) maxFreq = freq[c];
      const len = r - l + 1;
      if (distinct * maxFreq === len) {
        if (len > maxLen) maxLen = len;
      }
    }
  }
  return maxLen;
};
var solve = longestBalanced;
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
    if (args.length === 1 && Array.isArray(args[0]) && longestBalanced.length > 1 && args[0].length === longestBalanced.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = longestBalanced(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = longestBalanced;
