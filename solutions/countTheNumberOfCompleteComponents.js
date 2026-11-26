var countCompleteComponents = function(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }
  const vis = new Uint8Array(n);
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (vis[i] === 0) {
      const comp = [i];
      vis[i] = 1;
      let head = 0;
      let totalDegree = 0;
      while (head < comp.length) {
        const u = comp[head++];
        totalDegree += adj[u].length;
        for (let j = 0; j < adj[u].length; j++) {
          const v = adj[u][j];
          if (vis[v] === 0) {
            vis[v] = 1;
            comp.push(v);
          }
        }
      }
      const vCount = comp.length;
      const eCount = totalDegree / 2;
      if (eCount === (vCount * (vCount - 1)) / 2) {
        ans++;
      }
    }
  }
  return ans;
};
var solve = countCompleteComponents;
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
    if (args.length === 1 && Array.isArray(args[0]) && countCompleteComponents.length > 1 && args[0].length === countCompleteComponents.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = countCompleteComponents(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = countCompleteComponents;
