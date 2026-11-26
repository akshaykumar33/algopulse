var vowelStrings = function(words, queries) {
  function isVowel(code) {
    return code === 97 || code === 101 || code === 105 || code === 111 || code === 117;
  }
  const n = words.length;
  const pref = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    const w = words[i];
    const good = isVowel(w.charCodeAt(0)) && isVowel(w.charCodeAt(w.length - 1));
    pref[i + 1] = pref[i] + (good ? 1 : 0);
  }
  const m = queries.length;
  const ans = new Array(m);
  for (let i = 0; i < m; i++) {
    ans[i] = pref[queries[i][1] + 1] - pref[queries[i][0]];
  }
  return ans;
};
var solve = vowelStrings;
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
    const res = vowelStrings(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = vowelStrings;
