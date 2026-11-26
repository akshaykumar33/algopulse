var countDistinct = function(n) {
  const s = String(n);
  const L = s.length;
  let ans = 0;
  const pow9 = new Float64Array(L + 1);
  pow9[0] = 1;
  for (let i = 1; i <= L; i++) pow9[i] = pow9[i - 1] * 9;
  for (let k = 1; k < L; k++) {
    ans += pow9[k];
  }
  for (let i = 0; i < L; i++) {
    const d = s.charCodeAt(i) - 48;
    const choices = d === 0 ? 0 : d - 1;
    ans += choices * pow9[L - 1 - i];
    if (d === 0) break;
    if (i === L - 1) ans++;
  }
  return ans;
};
var solve = countDistinct;
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
    if (args.length === 1 && Array.isArray(args[0]) && countDistinct.length > 1 && args[0].length === countDistinct.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = countDistinct(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = countDistinct;
