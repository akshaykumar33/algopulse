var processQueries = function(c, connections, queries) {
  const parent = new Int32Array(c + 1);
  const rank = new Int32Array(c + 1);
  for (let i = 1; i <= c; i++) parent[i] = i;
  const find = (x) => {
    let r = x;
    while (parent[r] !== r) r = parent[r];
    while (parent[x] !== r) {
      const nxt = parent[x];
      parent[x] = r;
      x = nxt;
    }
    return r;
  };
  for (let i = 0; i < connections.length; i++) {
    let a = find(connections[i][0]);
    let b = find(connections[i][1]);
    if (a !== b) {
      if (rank[a] < rank[b]) {
        const tmp = a; a = b; b = tmp;
      }
      parent[b] = a;
      if (rank[a] === rank[b]) rank[a]++;
    }
  }
  const comp = new Array(c + 1);
  for (let i = 1; i <= c; i++) {
    const r = find(i);
    if (!comp[r]) comp[r] = [];
    comp[r].push(i);
  }
  const ptr = new Int32Array(c + 1);
  const online = new Uint8Array(c + 1);
  online.fill(1);
  const res = [];
  for (let i = 0; i < queries.length; i++) {
    const t = queries[i][0];
    const x = queries[i][1];
    if (t === 2) {
      online[x] = 0;
    } else if (online[x]) {
      res.push(x);
    } else {
      const r = find(x);
      const list = comp[r];
      let p = ptr[r];
      while (p < list.length && !online[list[p]]) p++;
      ptr[r] = p;
      res.push(p < list.length ? list[p] : -1);
    }
  }
  return res;
};
var solve = processQueries;
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
    if (args.length === 1 && Array.isArray(args[0]) && processQueries.length > 1 && args[0].length === processQueries.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = processQueries(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = processQueries;
