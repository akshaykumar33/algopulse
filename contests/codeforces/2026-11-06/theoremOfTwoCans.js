let input = '';
let done = false;
const solve = lines => {
  let p = 0;
  const get = () => {
    if (p >= lines.length) throw 0;
    return lines[p++];
  };
  const mode = get();
  const t = parseInt(get());
  const output = [];
  for (let tc = 0; tc < t; tc++) {
    if (mode === 'first') {
      const n = parseInt(get());
      const s = get();
      const edges = [];
      const one = s.indexOf('1');
      if (one === -1) {
        for (let v = 2; v <= n; v++) edges.push(`1 ${v}`);
        edges.push('2 3');
      } else {
        const r = one + 2;
        for (let v = 2; v <= n; v++) {
          if (s[v - 2] === '1') edges.push(`1 ${v}`);
          else edges.push(`${r} ${v}`);
        }
      }
      output.push(String(edges.length));
      for (const e of edges) output.push(e);
    } else {
      const [n, m] = get().split(/\s+/).map(Number);
      const adj = Array.from({ length: n + 1 }, () => []);
      for (let i = 0; i < m; i++) {
        const [u, v] = get().split(/\s+/).map(Number);
        adj[u].push(v);
        adj[v].push(u);
      }
      const col = new Int8Array(n + 1).fill(-1);
      col[1] = 0;
      const q = [1];
      let ok = true;
      for (let h = 0; h < q.length; h++) {
        const u = q[h];
        for (const v of adj[u]) {
          if (col[v] === -1) {
            col[v] = col[u] ^ 1;
            q.push(v);
          } else if (col[v] === col[u]) ok = false;
        }
      }
      let res = '';
      for (let v = 2; v <= n; v++) res += ok ? col[v] : 0;
      output.push(res);
    }
  }
  return output;
};
const go = fin => {
  if (done) return;
  const raw = input.split(/\r?\n/);
  if (!fin) raw.pop();
  const lines = raw.map(s => s.trim()).filter(s => s.length);
  let output;
  try {
    output = solve(lines);
  } catch (e) {
    if (e === 0) return;
    throw e;
  }
  done = true;
  process.stdout.write(output.join('\n') + '\n');
  process.exit(0);
};
process.stdin.on('data', d => {
  input += d;
  go(false);
});
process.stdin.on('end', () => go(true));
