var getWordsInLongestSubsequence = function(words, groups) {
  const n = words.length;
  const dp = new Int32Array(n).fill(1);
  const parent = new Int32Array(n).fill(-1);
  let maxLen = 1;
  let bestIdx = 0;

  const hamming1 = (a, b) => {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
      if (a.charCodeAt(i) !== b.charCodeAt(i)) {
        diff++;
        if (diff > 1) return false;
      }
    }
    return diff === 1;
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (groups[i] !== groups[j] && hamming1(words[i], words[j])) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          parent[i] = j;
        }
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      bestIdx = i;
    }
  }

  const res = [];
  let cur = bestIdx;
  while (cur !== -1) {
    res.push(words[cur]);
    cur = parent[cur];
  }
  res.reverse();
  return res;
};
var solve = getWordsInLongestSubsequence;
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
    if (args.length === 1 && Array.isArray(args[0]) && getWordsInLongestSubsequence.length > 1 && args[0].length === getWordsInLongestSubsequence.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = getWordsInLongestSubsequence(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = getWordsInLongestSubsequence;
