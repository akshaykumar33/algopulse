const data = require('fs').readFileSync(0, 'utf-8');
let pos = 0;
const next = () => {
  while (data.charCodeAt(pos) <= 32) pos++;
  let s = pos;
  while (pos < data.length && data.charCodeAt(pos) > 32) pos++;
  return +data.slice(s, pos);
};
const M = 100200;
const comp = new Uint8Array(M);
for (let i = 2; i * i < M; i++) if (!comp[i]) for (let j = i * i; j < M; j += i) comp[j] = 1;
const nxt = new Int32Array(M);
for (let i = M - 1, p = 0; i >= 2; i--) {
  if (!comp[i]) p = i;
  nxt[i] = p;
}
const t = next();
const output = [];
for (let tc = 0; tc < t; tc++) {
  const n = next();
  const res = new Array(n);
  for (let i = 0; i < n; i++) res[i] = nxt[next()];
  output.push(res.join(' '));
}
console.log(output.join('\n'));
